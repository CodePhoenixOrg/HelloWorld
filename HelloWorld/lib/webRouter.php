<?php
namespace SoundLib\Lib;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of router
 *
 * @author David
 */
class WebRouter
{
    use HttpTransport;
    
    //put your code here
    private $viewName = '';    
    private $className = '';
    private $baseNamespace = '';
    private $controllerFileName = '';

    public function __construct(WebApplication $app)
    {
        $this->request = $app->getRequest();
        $this->response = $app->getResponse();
    }

    public function translate()
    {
        $nsParts = explode('\\', __NAMESPACE__);
        $this->baseNamespace = array_shift($nsParts);

        $qParts = explode('/', REQUEST_URI);
        $this->viewName = array_shift($qParts);        
        $this->viewName = ($this->viewName === '') ? 'home' : $this->viewName;
        $this->className = ucfirst($this->viewName);
        
        $this->controllerFileName = DOCUMENT_ROOT . 'app' . DIRECTORY_SEPARATOR . 'controllers' . DIRECTORY_SEPARATOR . $this->viewName . '.class.php';
        
        return file_exists($this->controllerFileName);
    }

    public function dispatch()
    {
        $fqObject = $this->baseNamespace . '\\Controllers\\' . $this->className;

        include $this->controllerFileName;

        $view = new View($this->viewName);
        $instance = new $fqObject($view);
        $instance->render();
    }

}
