<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
    /**
     * @Route("/registration", name="registration")
     * @param EntityManagerInterface $em
     * @param Request $request
     * @return Response
     * @throws \Exception
     */
    public function newUser(EntityManagerInterface $em, Request $request)
    {
        $form = $this->createForm(RegistrationFormType::class);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            $user = new User();
            $user->setUsername($data['username'])
                 ->setPassword($data['password'])
                 ->setRegistrationDate(new \DateTime());

            $em->persist($user);
            $em->flush();

            return $this->redirectToRoute('playground');
        }

        return $this->render('registration/index.html.twig', [
            'registrationForm' => $form->createView()
        ]);
    }
}
