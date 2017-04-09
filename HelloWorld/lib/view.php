<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoundLib\Lib;

/**
 * Description of view
 *
 * @author David
 */
class View
{
    //put your code here
    private $viewName = '';
    private $viewFileName = '';
    
    public function __construct($viewName)
    {
        $this->viewName = $viewName;
        $this->viewFileName = DOCUMENT_ROOT . 'app' . DIRECTORY_SEPARATOR . 'views' . DIRECTORY_SEPARATOR . $viewName . '.phtml';
    }
    
    public function getTemplate()
    {
        $template = file_get_contents($this->viewFileName);
        
        return $template;
    }
}
