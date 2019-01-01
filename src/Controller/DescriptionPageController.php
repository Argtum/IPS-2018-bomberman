<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DescriptionPageController extends AbstractController
{
    /**
     * @Route("/description", name="description_page")
     */
    public function index()
    {
        return $this->render('description_page/index.html.twig', []);
    }
}
