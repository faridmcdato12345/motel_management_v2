<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function voucherIndex()
    {
        return inertia('Upload/Voucher/Index');
    }
}
