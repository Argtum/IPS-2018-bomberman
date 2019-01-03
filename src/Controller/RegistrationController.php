<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
    /**
     * @Route("/registration", name="registration")
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function newUser(EntityManagerInterface $em)
    {
        $form = $this->createForm(RegistrationFormType::class);

//        $user = new User();
//        $user->setNickname('Silver')
//             ->setPassword('password')
//             ->setRegistrationDate(\DateTime::createFromFormat('Y-m-d', '2019-01-02'));
//
//        $em->persist($user);
//        $em->flush();

        return $this->render('registration/index.html.twig', [
            'registrationForm' => $form->createView()
        ]);
    }
}
