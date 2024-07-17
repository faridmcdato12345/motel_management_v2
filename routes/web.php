<?php
use App\Models\User;
use Inertia\Inertia;
use App\Models\Motel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

use Illuminate\Foundation\Application;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RateController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\ScanController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\MotelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VoucherController;
use App\Http\Controllers\RoomTypeController;
use App\Http\Controllers\GuestTypeController;
use App\Http\Controllers\AddMotelUserController;
use App\Http\Controllers\UploadVoucherController;
use App\Models\GuestType;
use App\Models\Room;

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/motel',MotelController::class)->except('create','edit');
    Route::resource('/guest_type',GuestTypeController::class);
    Route::resource('/room_type', RoomTypeController::class);

    Route::post('/add_motel_user/{motel}', [AddMotelUserController::class,'store'])->name('store.motel.user');
    Route::resource('/users',UserController::class)->except('create','edit','show','update');
    Route::get('/users/{id}', [UserController::class,'show'])->name('users.show');
    Route::patch('/users/{user}/{motel}',[UserController::class,'update'])->name('users.update');

    Route::resource('/guest', GuestController::class)->except('create','edit');

    Route::resource('/rates', RateController::class)->except('create','edit');
    Route::resource('/rooms', RoomController::class)->except('create','edit');
    Route::resource('/vouchers', VoucherController::class)->except('create','edit');

    Route::get('/home',[HomeController::class,'index'])->name('home.index');

    Route::get('/scan/voucher', [ScanController::class,'index'])->name('scan.index');

    Route::get('/upload/voucher',[UploadVoucherController::class,'index'])->name('upload.voucher.index');

    Route::post('/upload/voucher',[UploadVoucherController::class,'store'])->name('upload.voucher');
    Route::post('/guest/store/multi_client',[GuestController::class,'storeBulk'])->name('guest.store.multi_client');
    Route::get('/guest_type/show',[GuestTypeController::class,'showAll'])->name('guest.show.all');
    Route::get('/user/home', [UserController::class,'home'])->name('user.home');
});
Route::get('/test',function() {
    $user = User::findOrFail(1);
    $data = $user->with('vouchers.guests.types')->get();
    dd($data);
});
require __DIR__.'/auth.php';
