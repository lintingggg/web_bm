<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolePermissionSeeder::class);
        $this->call(MenuSeeder::class);
        $this->call(HashtagSeeder::class);
        $this->call(CategorySeeder::class);

        User::query()->delete();

        User::factory()->create([
            'name' => 'Super Admin',
            'email' => env('SUPERADMIN_EMAIL', 'superadmin@cmslara.test'),
            'password' => Hash::make(env('SUPERADMIN_PASSWORD', 'password')),
            'phone_number' => '+6281111111111',
            'gender' => 'male',
            'role' => 'superadmin',
            'is_active' => true,
        ]);

        User::factory()->create([
            'name' => 'Admin CMS',
            'email' => env('ADMIN_EMAIL', 'admin@cmslara.test'),
            'password' => Hash::make(env('ADMIN_PASSWORD', 'password')),
            'phone_number' => '+6282222222222',
            'gender' => 'female',
            'role' => 'admin',
            'is_active' => true,
        ]);

        User::factory()->create([
            'name' => 'Editor CMS',
            'email' => env('EDITOR_EMAIL', 'editor@cmslara.test'),
            'password' => Hash::make(env('EDITOR_PASSWORD', 'password')),
            'phone_number' => '+6283333333333',
            'gender' => 'other',
            'role' => 'editor',
            'is_active' => true,
        ]);

        User::factory(180)->create();
        User::factory(20)->unverified()->create();

        $this->call(PageSeeder::class);
        $this->call(PostSeeder::class);
        $this->call(GallerySeeder::class);
        $this->call(NotificationSeeder::class);
        $this->call(ContactMessageSeeder::class);
    }
}
