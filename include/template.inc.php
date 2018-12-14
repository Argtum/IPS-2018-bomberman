<?php
    function getView($templateName, $vars)
    {
        $loader = new Twig_Loader_Filesystem($_SERVER['DOCUMENT_ROOT'] . "/project_bomberman/template");
        $twig   = new Twig_Environment($loader);
        return $twig->render($templateName, $vars);
    }