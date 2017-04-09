<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoundLib\Rest;

/**
 * Description of playlist
 *
 * @author David
 */
class Collection extends \SoundLib\Lib\RestController
{
    //put your code here    
    public function get()
    {
        $collection = \SoundLib\Models\Collection::getAllTracks();
        $this->response->setData($collection);
    }
}
