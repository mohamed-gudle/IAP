<?php
interface Account
{
    public function register($pdo);
    public function login($pdo);
    public function changePassword($pdo,$newPassword);
    public function logout($pdo);
}
