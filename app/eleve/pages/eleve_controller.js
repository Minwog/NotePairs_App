angular.module('NotePairApp')
    .controller('EleveController',['$scope','$state','$stateParams', 'httpq', 'textAngularManager', function ($scope,$state,$stateParams,httpq,textAngularManager) {

        $scope.version = textAngularManager.getVersion();
        $scope.versionNumber = $scope.version.substring(1);
        $scope.orightml = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><img class="ta-insert-video" ta-insert-video="http://www.youtube.com/embed/2maA1-mvicY" src="" allowfullscreen="true" width="300" frameborder="0" height="250"/></p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE9+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p><h4>Supports non-latin Characters</h4><p>昮朐 魡 燚璒瘭 譾躒鑅, 皾籈譧 紵脭脧 逯郹酟 煃 瑐瑍, 踆跾踄 趡趛踠 顣飁 廞 熥獘 豥 蔰蝯蝺 廦廥彋 蕍蕧螛 溹溦 幨懅憴 妎岓岕 緁, 滍 蘹蠮 蟷蠉蟼 鱐鱍鱕, 阰刲 鞮鞢騉 烳牼翐 魡 骱 銇韎餀 媓幁惁 嵉愊惵 蛶觢, 犝獫 嶵嶯幯 縓罃蔾 魵 踄 罃蔾 獿譿躐 峷敊浭, 媓幁 黐曮禷 椵楘溍 輗 漀 摲摓 墐墆墏 捃挸栚 蛣袹跜, 岓岕 溿 斶檎檦 匢奾灱 逜郰傃</p>';
        $scope.htmlcontent = $scope.orightml;
        $scope.disabled = false;
        $scope.tab=0;

        $scope.eleveCo =
        {
            "enseignant_id": "57dfeaf1e8f757d807dcd035",
            "user_id": "57dfeaf1ab1de26fd76523ba",
            "prenom": "Cross",
            "nom": "Cazier",
            "email": "cross@test.com",
            "cours": [
                "Physique quantique",
                "Representation analytique des signaux et systemes",
                "Composants à semiconducteurs"
            ],
            "avatar":"../resources/images/avatar.jpg"
        }

        $scope.copie=
        {
            "id":1,
            "date_rendu":"25/12/2016",
            "note":0,
            "user_id":1,
            "fichier":"../resources/cvAurorev3.pdf",
            "sections":[
                {
                    "id": 1,
                    "titre": "Ma première section",
                    "description": "Ceci est ma première section",
                    "enonce": "../resources/cvAurorev3.pdf",
                    "ordre": "1",
                    "points": "5",
                    "type_rendu": "fichier",
                    "evaluation_id": 1,
                    "criteres":[
                        {
                            "position":1,
                            "type":"commentaire",
                            "description":"Commentez",
                            "ordre":1,
                            "id":1
                        },
                        {
                            "position":2,
                            "type":"jugement",
                            "description":"Jugez",
                            "points":2,
                            "precision":0.2,
                            "ordre":2,
                            "id":2
                        },
                        {
                            "position":3,
                            "type":"jugement",
                            "description":"Commentez",
                            "ordre":3,
                            "id":3
                        }

                    ]
                },
                {
                    "id":2,
                    "titre":"Ma deuxième section",
                    "description":"Ceci est ma deuxième section",
                    "enonce":"contenu",
                    "ordre":"2",
                    "points":"5",
                    "type_rendu":"texte",
                    "extension":"null",
                    "evaluation_id":1,
                    "criteres":[
                        {
                            "position":1,
                            "type":"condition",
                            "description":"Commentez",
                            "points":2,
                            "ordre":1,
                            "id":1
                        },
                        {
                            "position":2,
                            "type":"jugement",
                            "description":"Jugez",
                            "points":2,
                            "precision":0.2,
                            "ordre":2,
                            "id":2
                        }

                    ]
                },
                {
                    "id":3,
                    "titre":"Ma troisième section",
                    "description":"Ceci est ma troisième section",
                    "enonce":"contenu",
                    "ordre":"3",
                    "points":"5",
                    "type_rendu":"fichier",
                    "evaluation_id":1,
                    "criteres":[
                        {
                            "position":1,
                            "type":"commentaire",
                            "description":"Commentez",
                            "ordre":1,
                            "id":1
                        },
                        {
                            "position":2,
                            "type":"jugement",
                            "description":"Jugez",
                            "points":2,
                            "precision":0.2,
                            "ordre":2,
                            "id":2
                        }

                    ]
                },
            ]
        }

        $scope.setTab=function(i){
            $scope.tab=i;
        }

        $scope.isTab=function(i){
            return ($scope.tab===i);
        }

        $scope.selecritere = "";
    }])