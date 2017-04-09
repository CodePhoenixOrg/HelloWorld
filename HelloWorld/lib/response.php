<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoundLib\Lib;

/**
 * Description of response
 *
 * @author David
 */
class Response implements \JsonSerializable
{
    private $data = [];
    //put your code here
    
    public function setData($key, $value = '')
    {
        if(is_array($key)) {
            foreach ($key as $left => $right) {
                $this->data[$left] = $right;
            }
        } else {
            Log::debug($key);
            $this->data[$key] = $value;
        }
    }

    public function returnCode($httpCode)
    {
        return http_response_code($httpCode);
    }
    
    public function jsonSerialize()
    {
        return $this->data;
    }

    public function sendXmlData($data)
    {  
        header('Content-type: application/xml; charset=UTF-8');
        echo XmlUtils::convertArray($data);
    }
    
    public function sendJsonData()
    {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($this);
    }
}
