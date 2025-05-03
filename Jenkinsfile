pipeline {
  agent { label 'dind' }

  environment {
    REGISTRY = 'registry.home.arpa:5000'
    IMAGE    = "${REGISTRY}/chuck_front"
  }

  stages {
    /* --- 1. Clone --- */
    stage('Checkout') {
      steps { checkout scm }
    }

    /* --- 2. Tests via le Dockerfile test/ --- */
    stage('Tests') {
      steps {
        sh '''
          docker build -f docker/test/Dockerfile -t chuck_front_tests:${BUILD_NUMBER} .
          docker run --rm chuck_front_tests:${BUILD_NUMBER}
        '''
      }
    }

    /* --- 3. Build de l’image finale via docker/build/ --- */
    stage('Build image') {
      steps {
        sh """
          docker build -f docker/build/Dockerfile \
                       -t ${IMAGE}:${BUILD_NUMBER} .
        """
      }
    }

    /* --- 4. Push sur le registry privé --- */
    stage('Push') {
      steps {
        sh "docker push ${IMAGE}:${BUILD_NUMBER}"
      }
    }

    /* --- 5. Déploiement en prod --- */
    stage('Deploy') {
      steps {
        sshagent(['prod-ssh-key']) {
          sh """
            ssh vagrant@prod.home.arpa '
              cd /home/vagrant/prod.front &&
              docker pull ${IMAGE}:${BUILD_NUMBER} &&
              docker-compose down &&
              docker-compose up -d
            '
          """
        }
      }
    }
  }
}
