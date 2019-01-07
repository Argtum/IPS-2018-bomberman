<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @IsGranted("ROLE_USER")
 */
class PlaygroundPageController extends AbstractController
{
    /**
     * @Route("/bomberman/game/{number_of_players}", name="playground")
     * @param $number_of_players
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function index($number_of_players)
    {
        return $this->render('playground_page/playground.html.twig', [
            'number_of_players' => $number_of_players
        ]);
    }
}
