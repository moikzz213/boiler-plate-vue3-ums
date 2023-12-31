<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClientKeyController;
use App\Http\Controllers\CustomAuthController;
use App\Http\Controllers\PublicPageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/



// Auth::routes();
Auth::routes([
    'register' => false
]);  

/**
 * Admin routes
 */

Route::get('/', [PageController::class, 'home'])->name('admin');
Route::get('/{slug}', [PageController::class, 'home'])->name('admin.slug');

// users
Route::get('/users/{id}', [PageController::class, 'home'])->name('admin.single.user');
Route::get('/users/page/{page}', [PageController::class, 'home'])->name('admin.paginated.users');
// users axios
Route::get('/user/single/{id}', [UserController::class, 'getSingleUser'])->name('admin.get.single.user');


/**
 * Accout routes
 */
Route::prefix('account')->group(function () {
    Route::get('/', [PageController::class, 'home'])->name('account');
});
 

/**
 * Save Client Access
 */
Route::post('/client/removekey', [ClientKeyController::class, 'removeKey'])->name('client.access.remove');