<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace SoundLib\Data;

use \PDO;
/**
 * Description of connection
 *
 * @author david
 */
class Connection
{
    //put your code here
    private $connection = null;
    
    public function open()
    {
        $this->connection = new \PDO(
            'mysql:host=localhost;dbname=soundlib',
            'djay',
            'demo',
            [\PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"]
        );
        
        return $this->connection;
    }
}
