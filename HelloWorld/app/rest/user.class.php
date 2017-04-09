<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoundLib\Rest;

/**
 * Description of user
 *
 * @author David
 */
class User extends \SoundLib\Lib\RestController
{
    //put your code here
    public function get($userId)
    {
        $info = \SoundLib\Models\User::getInfo($userId);
        $this->response->setData($info);
    }    

    public function head($userId)
    {
        $info = \SoundLib\Models\User::getInfo($userId);
        $this->response->setData($info);
    } 
    
}
