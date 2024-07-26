<?php

namespace App\Services;

use OpenAI;
use Exception;
use App\Models\User;
use App\Models\Motel;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Str;
use GuzzleHttp\Exception\RequestException;

class Gpt4VisionService
{
    protected $client;
    protected $apiKey;
    protected $days;
    protected $rates;
    /**
     * Create a new class instance.
     */
    public function __construct(GetDaysService $days, RoomRateService $rate)
    {
        $this->client = new Client();
        $this->apiKey = env('OPENAI_API_KEY');
        $this->days = $days;
        $this->rates = $rate;
    }

    public function analyzeImage($imagePath,$fullPath)
    {
        $users = User::findOrFail(auth()->user()->id);
        $motelArr = [];
        foreach($users->motels as $motel){
            $motelArr[] = $motel->motel_name;
        }
        $startTime = microtime(true);
        $client = OpenAI::client(config('openai.key')); 
        
        $prompt = "Extract the following information from the letter in json form, use the same keys.
                clients: there could be multiple client names on the right side of the letter.
                total: the first amount that starts with $. Return NUMBER, not TEXT.
                amount_per_client: the other amount that starts with $. Return Number, not Text and return array if there is any other amount. For example if found '$250 for April','$250 for Maria','$250 for Raymond' return ['250','250','250']
                contribution: extract the amount (starts with $) of client contribution from the second image (if any). Just number. No text. If null, return 0
                dates: extract the start and end dates that the voucher will cover, excluding check-out date. It will be found in the body of the letter. Sometimes it could be for one day only. No key required for array.
                check_out: extract the check-out date.
                case_number: case #, it starts with PA. Return empty if not available and return array if found comma. For example PA129690,1,2 return ['PA129690','PA129691','PA129692']
                motel_name: return ".implode(' or ',$motelArr).". Only return these exact names. e.g if the name is The Motor Inn in the image, return 'Motor Inn'";
        $response = $client->chat()->create([
            'model' => 'gpt-4-vision-preview',
            'max_tokens' => 300,
            // 'response_format' => ['type' => 'json_object'],
            'messages' => [
                [
                    'role' => 'system',
                    'content' => [
                        [
                            'type' => 'text',
                            'text' => 'Return only JSON without any Markdown formatting or additional text.'
                        ]
                    ]
                ],
                [
                    'role' => 'user',
                    'content' => [
                        [
                            'type' => 'text',
                            'text' => $prompt
                        ],
                        [
                            'type' => 'image_url',
                            'image_url' => [
                                'url' => $imagePath,
                                'detail' => 'high'
                            ]
                        ]
                    ]
                ]
            ]
        ]);
        
        try {
            $json = $response->choices[0]->message->content;
            $json = Str::markdown($json);
            $json = strip_tags($json);
            $json = html_entity_decode($json);
            $data = json_decode($json, true);
            
            if(count($data['amount_per_client']) > 1){
                $dataArr = [];

                for($i = 0; $i < count($data['amount_per_client']); $i++){
                    $dataArr[] = [
                        'client' => $data['clients'][$i] ?? '',
                        'total' => $data['total'] ?? '',
                        'amount' => $data['amount_per_client'][$i] ?? '',
                        'contribution' => $data['contribution'] ?? '',
                        'check_in' => $data['dates'] ? $this->formatDate($data['dates'][0]): '',
                        'case_number' => $data['case_number'][$i] ?? '',
                        'motel_name' => $data['motel_name'] ?? '',
                        'days' => $this->days->numberOfDays($data['dates']) ?? '',
                        'type' => '',
                        'check_out' => $data['check_out'] ? $this->formatDate($data['check_out']): '',
                        'room_number' => '',
                        'room_type' => '',
                        'image_path' => $fullPath
                    ];
                }
                return $dataArr;
            }else if (count($data['clients']) > 1){
                $dataArr = [
                    'clients' =>$data['clients'] ?? '',
                    'total' => $data['total'] ?? '',
                    'amount_per_client' => $data['amount_per_client'] ?? '',
                    'contribution' => $data['contribution'] ?? '',
                    'check_in' => $data['dates'] ? $this->formatDate($data['dates'][0]): '',
                    'case_number' => $data['case_number'] ?? '',
                    'motel_name' => $data['motel_name'] ?? '',
                    'cents' => ($response->usage->promptTokens * 3 / 1000) + ($response->usage->completionTokens * 6 / 1000),
                    'days' => $this->days->numberOfDays($data['dates']),
                    'type' => [],
                    'room_number' => '',
                    'check_out' => $data['check_out'] ? $this->formatDate($data['check_out']): '',
                    'room_type' => '',
                    'image_path' => $fullPath
                ];
                for($i = 0;$i < count($data['clients']); $i++){
                    $dataArr['type'][$i] = ['type' => ''];
                }
                return $dataArr;
            }
            return [
                    'clients' =>$data['clients'] ?? '',
                    'total' => $data['total'] ?? '',
                    'amount_per_client' => $data['amount_per_client'] ?? '',
                    'contribution' => $data['contribution'] ?? '',
                    'check_in' => $data['dates'] ? $this->formatDate($data['dates'][0]): '',
                    'case_number' => $data['case_number'] ?? '',
                    'motel_name' => $data['motel_name'] ?? '',
                    'cents' => ($response->usage->promptTokens * 3 / 1000) + ($response->usage->completionTokens * 6 / 1000),
                    'days' => $this->days->numberOfDays($data['dates']),
                    'type' => [],
                    'room_number' => '',
                    'check_out' => $data['check_out'] ? $this->formatDate($data['check_out']): '',
                    'room_type' => '',
                    'image_path' => $fullPath,
                    'rate_amount' => $this->rates->getRate(1,$this->days->numberOfDays($data['dates']),"shared")
                ];
        } catch(Exception $e) {
           return response()->json(['error' => $e->getMessage()], 500);
        }

    }
    private function formatDate($date)
    {
        $parsedDate = Carbon::createFromFormat('m/d/y',$date);
        return $parsedDate->format('Y-m-d');
    }
}
