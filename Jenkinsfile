pipeline {
  agent { label 'dind' }

  environment {
    /* ←–––– adresse IP du registry privé */
    REGISTRY = '192.168.56.151:5000'
    IMAGE    = "${REGISTRY}/chuck_front"
  }

  stages {
    /* 1. Checkout ------------------------------------------------------ */
    stage('Checkout') {
      steps { checkout scm }
    }

    /* 2. Tests ---------------------------------------------------------- */
    stage('Tests') {
      steps {
        sh '''
          docker build -f docker/test/Dockerfile -t chuck_front_tests:${BUILD_NUMBER} .
          docker run --rm chuck_front_tests:${BUILD_NUMBER}
        '''
      }
    }

    /* 3. Build image ---------------------------------------------------- */
    stage('Build image') {
      steps {
        sh """
          docker build -f docker/build/Dockerfile \
                       -t ${IMAGE}:${BUILD_NUMBER} .
        """
      }
    }

    /* 4. Push vers le registry privé ----------------------------------- */
    stage('Push') {
      steps {
        sh "docker push ${IMAGE}:${BUILD_NUMBER}"
      }
    }

    /* 5. Déploiement sur la VM prod ------------------------------------ */
    stage('Deploy') {
      steps {
        /*  prod-ssh-key  = ID Jenkins de ta clé privée  */
        withCredentials([sshUserPrivateKey(credentialsId: 'prod-ssh-key',
                                           keyFileVariable: 'KEY',
                                           usernameVariable: 'USER')]) {
          sh '''
            ssh -i $KEY -o StrictHostKeyChecking=no $USER@prod.home.arpa "
              cd /home/vagrant/prod.front &&
              docker pull '${IMAGE}:${BUILD_NUMBER}' &&
              docker-compose down &&
              docker-compose up -d
            "
          '''
        }
      }
    }
  }
}
