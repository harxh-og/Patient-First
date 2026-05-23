pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t patient-first .'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker stop patient-first || true
                docker rm patient-first || true

                docker run -d \
                --name patient-first \
                -p 8080:80 \
                patient-first
                '''
            }
        }
    }
}