<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoundLib\Lib;

/**
 * Description of request
 *
 * @author David
 */
class Request 
{
    //put your code here
    private $requestUri = '';
    private $queryString = '';
    private $requestUriParts = '';

    public function __construct()
    {
        $this->requestUri = REQUEST_URI;
        $this->queryString = QUERY_STRING;
        $this->requestUriParts = explode('/', $this->requestUri);
        
    }
    
    public function getRequestUriParts()
    {
        return $this->requestUriParts;
    }
    
    public function getUri()
    {
        return REQUEST_URI;
    }

    public function getQueryString()
    {
        return QUERY_STRING;
    }

    public function getMethod()
    {
        return REQUEST_METHOD;
    }
    
    
}
