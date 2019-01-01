<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class PlaygroundController extends AbstractController
{
    /**
     * @Route("/playground", name="playground")
     */
    public function index()
    {
        return $this->render('playground/index.html.twig', []);
    }
}
