<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Exception\RequestException;

class ImgurService
{
    protected $client;
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.imgur.com/3/',
            'headers' => [
                'Authorization' => config('app.env') === 'local' ? 'Client-ID 6ec5a04a264fdfc' : 'Client-ID '.env('IMGUR_CLIENT_ID'),
            ],
        ]);
    }
    public function uploadImage($imagePath)
    {
        
        try{
            
            if (!file_exists($imagePath)) {
                
                throw new \Exception("File does not exist: $imagePath");
            }
            
            $mimeType = mime_content_type($imagePath);
            $validMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/tiff'];
            
            if (!in_array($mimeType, $validMimeTypes)) {
                
                throw new \Exception("Unsupported file type: $mimeType");
            }
            
            $response = $this->client->request('POST', 'image', [
                'multipart' => [
                    [
                        'name'     => 'image',
                        'contents' => fopen($imagePath, 'r'),
                        'filename' => basename($imagePath),
                        'headers'  => [
                            'Content-Type' => $mimeType,
                        ],
                    ],
                ],
            ]);
            Log::info('Image uploaded to Imgur, response: ' . $response->getBody());
            return json_decode($response->getBody(), true);
        }catch(RequestException  $e){
            Log::error('Error uploading image to Imgur: ' . $e->getMessage());
            if ($e->hasResponse()) {
                Log::error('Response: ' . $e->getResponse()->getBody()->getContents());
            }
            return ['error' => 'Failed to upload image'];
        }catch (\Exception $e) {
            Log::error('General error: ' . $e->getMessage());
            return ['error' => 'Failed to upload image'];
        }
    }

}
