<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * @IsGranted("ROLE_USER")
 */
class SettingsPageController extends AbstractController
{
    private $router;

    /**
     * @Route("/bomberman/settings", name="settings")
     * @param Request $request
     * @param RouterInterface $router
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function index(Request $request, RouterInterface $router)
    {
        $this->denyAccessUnlessGranted('ROLE_USER');

        $this->router = $router;
        if ($request->isMethod('POST')) {
            return new RedirectResponse($this->router->generate('playground', [
                'number_of_players' => $request->request->get('numberOfPlayers')
            ]));
        }
        return $this->render('settings_page/settings.html.twig', []);
    }
}
