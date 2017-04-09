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
class Playlist extends \SoundLib\Lib\RestController
{
    //put your code here
    public function get($userId)
    {
        $favorites = \SoundLib\Models\Playlist::getUserFavorites($userId);
        $this->response->setData($favorites);
    }
 
    public function put($playlist, $trackId)
    {
        $return = \SoundLib\Models\Playlist::addTrack($playlist, $trackId);
        $this->response->setData($return);
    }
    
    public function delete($trackId)
    {
        $return = \SoundLib\Models\Playlist::removeTrack($trackId);
        $this->response->setData($return);
    }
}
