pipeline {
  agent { label 'dind' }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build image') {
      steps {
        sh 'docker build -t registry.home.arpa:5000/chuck_front:${BUILD_NUMBER} .'
      }
    }

    stage('Push') {
      steps {
        sh 'docker push registry.home.arpa:5000/chuck_front:${BUILD_NUMBER}'
      }
    }

    stage('Deploy') {
      steps {
        sshagent(['prod-ssh-key']) {
          sh '''
            ssh vagrant@prod.home.arpa "
              cd /home/vagrant/prod.front &&
              docker pull registry.home.arpa:5000/chuck_front:${BUILD_NUMBER} &&
              docker-compose down &&
              docker-compose up -d
            "
          '''
        }
      }
    }
  }
}
