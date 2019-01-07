<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class InfoPageController extends AbstractController
{
    /**
     * @Route("/bombermen/info", name="info_page")
     */
    public function index()
    {
        return $this->render('info_page/info.html.twig', []);
    }
}
