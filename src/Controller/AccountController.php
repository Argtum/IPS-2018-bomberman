<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
* @IsGranted("ROLE_USER")
*/
class AccountController extends AbstractController
{
    /**
     * @Route("/bomberman/account", name="app_account")
     */
    public function index()
    {
        return $this->render('account/account.html.twig', []);
    }
}
