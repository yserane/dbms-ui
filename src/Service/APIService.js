export function getProductList() {
    return fetch('https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/dbms-aiwpy/service/getProducts/incoming_webhook/products')
      .then(data => data.json())
  }

  export function getUsabilityStudies(productId) {
    return fetch('https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/dbms-aiwpy/service/usabilityStudy/incoming_webhook/getUsabilityStudies?secret=root&productId='+productId)
      .then(data => data.json())
  }

  export function getSurveys(uId){
    return fetch('https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/dbms-aiwpy/service/getSurveyTasks/incoming_webhook/surveyQuestions?secret=root&uID='+uId)
      .then(data => data.json())
  }

  export function getSurveyTasks(uId) {
    return fetch('https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/dbms-aiwpy/service/tasks/incoming_webhook/getTasks?secret=root&uID='+uId)
    .then(data => data.json());
  }

  export function getResearcher(uId){
    return fetch('https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/dbms-aiwpy/service/getResearcher/incoming_webhook/researcher?secret=root&uID='+uId)
    .then(data => data.json());

  }
  export function getParticipants(uId){
    return fetch('  https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/dbms-aiwpy/service/getParticipants/incoming_webhook/participants?secret=root&uID='+uId)
    .then(data => data.json());

  }

  export function getChartData(uId){
    return fetch('https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/dbms-aiwpy/service/getParticipants/incoming_webhook/participantsAge?secret=root&uID='+uId)
    .then(data => data.json());

  }


