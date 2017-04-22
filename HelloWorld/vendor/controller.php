<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoundLib\Lib;

/**
 * Description of controller
 *
 * @author David
 */
abstract class Controller
{
    //put your code here
    private $view;
    
    public function __construct(View $view)
    {
        $this->view = $view;
    }

    public function load() {}

    public function render()
    {
        $this->load();
        $html = $this->parse();
        echo $html;
    }

    private function parse() 
    {
        $matches = [];
        
        $template = $this->view->getTemplate();

        $matches = $template.match("(<% [a-z]+ %>)");
        
        foreach ($matches[0] as $match) {
            $variable = trim(str_replace('%>', '', str_replace('<%', '', $match)));
            $template = str_replace($match, $this->$variable, $template);
        }
        
        ob_start();
        echo $template;
        $html = ob_get_clean();
        
        return $html;
    }
    
}
