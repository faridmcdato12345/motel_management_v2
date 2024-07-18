<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call(RolesAndPermissionsSeeder::class);
        $user = User::factory()->create([
            'username' => 'super-admin',
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        $role = Role::findOrCreate('Super Admin');
        $user->assignRole($role);
    }
}
