<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomepageController extends AbstractController
{
    /**
     * @Route({"/", "/bomberman"}, name="homepage")
     */
    public function homepage()
    {
        return $this->render('homepage/index.html.twig', []);
    }
}
