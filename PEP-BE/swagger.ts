
const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        "version": "1.0.0",                // by default: "1.0.0"
        "title": "Performance Evaluation Portal",
         "description": "Performance Evaluation Portal",
       "license": {
    "name": "MIT",
    "url": "https://opensource.org/licenses/MIT"
    }
    },
    host: "localhost:8000",            // by default: "localhost:8000"
    basePath: "/",                     // by default: "/"
    schemes: [],                      // by default: ['http']
    consumes: [],                     // by default: ['application/json']
    produces: [],                     // by default: ['application/json']
    tags: [                           // by default: empty Array
    
    ],
    components:{securitySchemes:{
        bearerAuth:{
            type: "http",
            name: "Authorization",  // name of the header, query parameter or cookie
            description: "any description...",
            scheme: "bearer"
        }
    }},     // by default: empty object}
  //   security :[{
        //       "bearerAuth": [
          //         
      //         ]
    //    }] ,
        
    definitions: {
        EmployeePostResponse:
        {
            status: "CREATED",
            data: {
                isActive: true,
                isDeleted: false,
                _id: "60508cec2b3679fb77a9d605",
                name: "Pawan",
                role: "employee",
                phoneNumber: "9076647216",
                yearOfJoining: "2021",
                empId: "NL-309",
                designation: "MTS-3",
                createdAt: "2021-03-09T11:34:15.300Z",
                updatedAt: "2021-03-09T11:34:15.300Z",
            }
        },
        
        EmployeeYOJResponse:
        {
            status: "SUCCESS",
            data: "2020"
        
        },
        EmployeeAllResponse:
        {
            
                status: "SUCCESS",
                data: [
                    {
                        isActive: true,
                        isDeleted: false,
                        _id: "604079f94755e41214a6520f",
                        name: "Vikash",
                        role: "employee",
                        phoneNumber: "8908755805",
                        yearOfJoining: "2020",
                        empId: "NL-315",
                        designation: "MTS-3",
                    },
                    {
                        isActive: true,
                        isDeleted: false,
                        _id: "60437078a8eaf340e4620092",
                        name: "Vikash Agarwal",
                        role: "employee",
                        phoneNumber: "8908755805",
                        yearOfJoining: "2020",
                        empId: "NL-305",
                        designation: "MTS-3",
                    }
                ]
                },
                EmployeeUserResponse:
                {
                    status: "SUCCESS",
                    data: {
                        isActive: true,
                        isDeleted: false,
                        _id: "60460b890dd54b13e08e422e",
                        name: "Archana Raparthi",
                        role: "employee",
                        phoneNumber: "8908755715",
                        yearOfJoining: "2020",
                        empId: "NL-310",
                        designation: "manager",
                    }
                },
                EmployeeUpdateResponse:
                {
                    status: "SUCCESS",
                    data: {
                        isActive: true,
                        isDeleted: false,
                        _id: "604079f94755e41214a6520f",
                        name: "Archana",
                        phoneNumber: "8885285252",
                        role: "employee",
                        designation: "manager",
                        yearOfJoining: "2020",
                        empId: "NL-310",
                        createdAt: "2021-03-09T11:34:15.300Z",
                        updatedAt: "2021-03-10T11:34:15.300Z",
                    }
                },
                EmployeeDeleteResponse:
                {
                    status: "DELETED"
                },
                PostUserResponse:
                {
                        status: "CREATED",
                        data: {
                            isActive: true,
                            isDeleted: false,
                            _id: "604bb31ff530b4158302e5fe",
                            email: "vikash.agarwal@nineleaps.com",
                            details: "604b6b3e5a5f0d116da6a7d0",
                            password: "$2b$10$GOWnjrGdfl3Ru64tI2b4PuCcZ5kgdgng1.aBe1GKI0wvj5X7uknpa",
                            createdAt: "2021-03-09T11:34:15.300Z",
                            updatedAt: "2021-03-09T11:34:15.300Z",
                    }
                },
                UserDeleteResponse:
                {
                    status: "DELETED"
                },
                UserUpdateResponse:
                {
                    status: "SUCCESS",
                    data: {
                        isActive: true,
                        isDeleted: false,
                        _id: "604079f94755e41214a6520f",
                        name: "Archana",
                        email:"raparthi.archana@nineleaps.com",
                        password:"$2b$10$GOWnjrGdfl3Ru64tI2b4PuCcZ5kgdgng1.aBe1GKI0wvj5X7uknpa",
                        createdAt: "2021-03-09T11:34:15.300Z",
                        updatedAt: "2021-03-10T11:34:15.300Z",
                    }

            },
            UserGetResponse:
            {
                status: "SUCCESS",
                data: {
                    isActive: true,
                    isDeleted: false,
                    _id: "60473c7edc95a52a58f1447e",
                    email: "poosapati.raju@nineleaps.com",
                    details: {
                        isActive: true,
                        isDeleted: false,
                        _id: "60473b90dc95a52a58f1447b",
                        name: "Raju",
                        role: "employee",
                        phoneNumber: "8885285332",
                        yearOfJoining: "2020",
                        empId: "NL-101",
                        designation: "SDE-2",
                    },
                    password: "$2b$10$p1jy8ZLAGVMLJ2MWtqyryuOrL9uRzpN3PZBMrTpEwRhCoGHhJ4Vg6",
                }
            },
            UserGetAllResponse:
            {
                status: "SUCCESS",
                data: [
                    {
                        isActive: true,
                        isDeleted: false,
                        _id: "60473b15dc95a52a58f1447a",
                        email: "dasari.darshani@nineleaps.com",
                        details: "604736b322d2232539df0355",
                        password: "$2b$10$l62t5TyS4WqNr118YR9SN.qOJjyhRpLaUQELhEaa01h.bGwzBAQlW",
                    },
                    {
                        isActive: true,
                        isDeleted: false,
                        _id: "60473c7edc95a52a58f1447e",
                        email: "poosapati.raju@nineleaps.com",
                        details: "60473b90dc95a52a58f1447b",
                        password: "$2b$10$p1jy8ZLAGVMLJ2MWtqyryuOrL9uRzpN3PZBMrTpEwRhCoGHhJ4Vg6", 
                    }
                       ]
                },
                PerfEvalAnsPostResponse:
                {
                    status: "CREATED",
                    data: {
                        answers: [
                            "Full Stack Developer",
                            "To provide services to the user",
                            "Met deadlines, fixed bugs and delivered good quality code."
                        ],
                        isActive: true,
                        isDeleted: false,
                        _id: "604879c52f164c44b04838d3",
                        email: "vikash.agarwal@nineleaps.com",
                        empId: "NL-101",
                        year: "2021",
                        quarter: "Q2",
                        projectName: "manager Team",
                        createdAt: "2021-03-09T11:34:15.300Z",
                        updatedAt: "2021-03-09T11:34:15.300Z",
                    }
                },
                ScoreSheetGetByIdResponse:
                {
                  status: "SUCCESS",
                    data: {
                        answers: [
                            "15",
                            "18",
                            "20",
                            "20"
                        ],
                        isActive: true,
                        isDeleted: false,
                        _id: "6047964a414a4f427aacd4d1",
                        email: "bella@nineleaps.com",
                        empId: "NL-300",
                        year: "2020",
                        quarter: "Q1",
                        projectName: "Tesco",
                        total: 73,
                        feedback: "Good Performance",
                        
                    }
                },
                PerfEvalAnsUpdateResponse:
                {
                    status: "SUCCESS",
                    data: {
                        answers: [
                            "Full Stack Developer",
                            "To provide services to the user",
                            "Met deadlines, fixed bugs and delivered good quality code."
                        ],
                        isActive: true,
                        isDeleted: false,
                        _id: "604879c52f164c44b04838d3",
                        email: "vikash.agarwal@nineleaps.com",
                        empId: "NL-101",
                        year: "2021",
                        quarter: "Q2",
                        projectName: "manager Team",
                        createdAt: "2021-03-09T11:34:15.300Z",
                        updatedAt: "2021-03-10T11:34:15.300Z",
                    }
                },
                PerfEvalGetResponse:
                
                    {
                        status: "SUCCESS",
                        data: [
                            {
                                answers: [
                                    "Manager",
                                    "To provide services to the user",
                                    "Met deadlines, fixed bugs and delivered good quality code.",
                                ],
                                isActive: true,
                                isDeleted: false,
                                _id: "60479fad414a4f427aacd4f8",
                                email: "dasari.darshani@nineleaps.com",
                                empId: "NL-100",
                                year: "2020",
                                quarter: "Q4",
                                projectName: "Swiggy",
                                createdAt: "2021-03-09T16:17:49.444Z",
                                updatedAt: "2021-03-09T16:17:49.444Z",
                                __v: 0
                            }
                        ]
                },
                PerfEvalAnsAllResponse:
                {
                    
                        status: "SUCCESS",
                        data: [
                            "Tesco",
                            "Uber"
                        ]
                    },
                PerfEvalAnsGetAllResponse:
                {
                    status: "SUCCESS",
                    data: {
                        questions: [
                            "What was your role in the project?",
                            "What are the key features of your project?",
                            "What are your most significant achievements and contributions this quarter?",
        
                        ],
                        answers: [
                            "Frontend Developer",
                            "To provide services to the user",
                            "Met deadlines, fixed bugs and delivered good quality code.",
                        ]
                    }
                },
                PerfEvalAnswerDeleteResponse:
                {
                    status: "DELETED"
                },
           AddEmployee:{
           $name:'John Doe',
           $phoneNumber:'1234567890',
           $role:'employee',
           $yearOfJoining:'2020',
           $designation:'MTS-1',
           $empId:'NL-002'
        },
        AuthenticationResponse:{
            status:"SUCCESS",
           data:{
              accessToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpa2FzaC5hZ2Fyd2FsQG5pbmVsZWFwcy5jb20iLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBJZCI6Ik5MLTMwNSIsIm5hbWUiOiJWaWthc2ggQWdhcndhbCIsImlhdCI6MTYxNTE4OTY4MiwiZXhwIjoxNjE1MTkxNDgyfQ.p0tXao2wp0xiNQLPnfEqS6qzmrBB3OmArMp5LJsCX2g",
              refereshToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpa2FzaC5hZ2Fyd2FsQG5pbmVsZWFwcy5jb20iLCJyb2xlIjoiZW1wbG95ZWUiLCJlbXBJZCI6Ik5MLTMwNSIsIm5hbWUiOiJWaWthc2ggQWdhcndhbCIsImlhdCI6MTYxNTE4OTY4MiwiZXhwIjoxNjE1Mjc2MDgyfQ.PMbC5qmaoB_1ycuFLadFmWV2H4pntYQr3GFojKbYBOk"

            }
        },
        ChangePasswordResponse:
        {
            status: "CREATED",
            data: {
                isActive: true,
                isDeleted: false,
                _id: "60473cdddc95a52a58f14480",
                email: "vikash.agarwal@nineleaps.com",
                details: {
                    isActive: true,
                    isDeleted: false,
                    _id: "60473c2adc95a52a58f1447d",
                    name: "Vikash",
                    role: "hrManager",
                    phoneNumber: "9876543210",
                    yearOfJoining: "2020",
                    empId: "NL-103",
                    designation: "Head-HR",
                },
                password: "$2b$10$mMxGwwF287tCfvGf7c.Iy.O5ZOOKdpzZX1pnz6cPJwGtd2/C/wwJi",
                createdAt: "2021-03-09T11:34:15.300Z",
                updatedAt: "2021-03-09T11:34:15.300Z",
            }
        },
        ProjectResponse:{
            status: "CREATED",
            data: {
                isDeleted: false,
                _id: "6045b3842193a43dc4962cca",
                projectId: "999",
                projectName: "Tesco",
                managerId: "6042ea899acc4f1e40ca8006",
                hrId:"6042ea899acc4f1e40ca8446",
                createdAt: "2021-03-09T11:34:15.300Z",
                updatedAt: "2021-03-09T11:34:15.300Z",
            }
        },
        AccessTokenResponse:
        {
            status: "CREATED",
            data: {
                accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpa2FzaC5hZ2Fyd2FsQG5pbmVsZWFwcy5jb20iLCJyb2xlIjoiaHJNYW5hZ2VyIiwiZW1wSWQiOiJOTC0xMDMiLCJuYW1lIjoiVmlrYXNoIiwiaWF0IjoxNjE1ODIyNDQxLCJleHAiOjE2MTU4MjQyNDF9.4kT3VRIb2p5heMeBaf-GNkZB7xqjRTMkdbMKcYspzP0"
            }
        },
        ProjectGetResponse:
        {
            status: "SUCCESS",
            data: [
                "Zomato",
                "Swiggy",
                "HR-Team"
            ]
        },
        ProjectManagerResponse:
        {
                status: "SUCCESS",
                data: [
                    "Zomato"
                ]
            },
        ProjectHrResponse:
        {
            status: "SUCCESS",
            data: [
                "Ola",
                "IRCTC"
            ]
        },
        ProjectDeleteResponse:
                {
                    status: "DELETED"
                },
                projectUpdateResponse:
                {
                    status: "SUCCESS",
                    data: {
                        isDeleted: false,
                        _id: "6045b3842193a43dc4962cca",
                        projectId: "997",
                        projectName: "Tesco",
                        managerId: "6042ea899acc4f1e40ca8006",
                        hrId:"6042ea899acc4f1e40ca8446",
                        createdAt: "2021-03-09T11:34:15.300Z",
                        updatedAt: "2021-03-10T11:34:15.300Z",
                    }
                },
        ProjectEmpResponse:{
            status: "CREATED",
        data: {
        isDeleted: false,
        _id: "6045be402193a43dc4962ccf",
        projectId: "6042ec259acc4f1e40ca8008",
        empId: "0339e365cd72829f8b89791",
        year: "2021",
        quarter: "Q2",
        createdAt: "2021-03-09T11:34:15.300Z",
        updatedAt: "2021-03-09T11:34:15.300Z",
    }
},
ProjectEmpGetResponse:
{
    status: "SUCCESS",
    data: [
        {
            empId: "NL-304",
            empName: "Deepak",
            empRole: "SDE-1"
        }
    ]
},
ProjectTotalGetResponse:
{
    status: "SUCCESS",
    data: [
        {
            empId: "NL-300",
            empName: "Bella",
            empRole: "MTS-1",
            total: 73
        },
        {
            empId: "NL-301",
            empName: "Susan",
            empRole: "MTS-2",
            total: 94
        },
    ]
},
projectEmpUpdateResponse:
                {
                    status: "SUCCESS",
                    data: {
                        isDeleted: false,
                        _id: "6045be402193a43dc4962ccf",
                        projectId: "6042ec259acc4f1e40ca8008",
                        empId: "60339e365cd72829f8b89791",
                        year: "2021",
                        quarter: "Q2",
                        createdAt: "2021-03-09T11:34:15.300Z",
                        updatedAt: "2021-03-10T11:34:15.300Z",
    }
                },
ProjectEmpDeleteResponse:
                {
                    status: "DELETED"
                },
                
ScoreSheetQuestion:
{
    status: "CREATED",
    data: {
        "questions": [
            "Effort",
            "Quality",
            "Productivity",
            "Creativity"
        ],
        isDeleted: false,
        _id: "6043cd73a8eaf340e46200a2",
        year: "2021",
        quarter: "Q2",
        createdAt: "2021-03-09T11:34:15.300Z",
        updatedAt: "2021-03-09T11:34:15.300Z",
    }
},
ScoreSheetUpdateQuestion:
{
    status: "SUCCESS",
    data: {
        questions: [
            "Effort",
            "Quantity",
            "Productivity",
            "Creativity"
        ],
        isDeleted: false,
        _id: "6043cd73a8eaf340e46200a2",
        year: "2021",
        quarter: "Q2",
        createdAt: "2021-03-09T11:34:15.300Z",
        updatedAt: "2021-03-10T11:34:15.300Z",
    }
},
ScoreSheetQuestionGetResponse:
{
    status: "SUCCESS",
    data: {
        questions: [
            "Effort",
            "Quality of deliverables",
            "Problem Solving Skills",
            "Ways of Working"
        ],
        isActive: true,
        isDeleted: false,
        _id: "60475d12414a4f427aacd4ad",
        year: "2020",
        quarter: "Q4",
        startDate: "2020-12-19T18:30:00.000Z",
        endDate: "2021-03-31T18:30:00.000Z",

    }
},
ScoreSheetQuestionStatusResponse:
{
        status: "SUCCESS",
        data: {
            isLive: true
        }
},
 ScoreSheetAnswer:{
            status: "CREATED",
     data: {
        answers: [
            "25",
            "20",
            "25",
            "22"
        ],
        isDeleted: false,
        _id: "6045c9a32193a43dc4962cd0",
        email: "poosapati.raju@nineleaps.com",
        empId: "NL-100",
        year: "2020",
        quarter: "Q4",
        project_name: "PEP",
        total: 70,
        feedback: "Outstanding Performance",
        createdAt: "2021-03-09T11:34:15.300Z",
        updatedAt: "2021-03-09T11:34:15.300Z",
    }
},
ScoreSheetAnswerUpdateResponse:
{
    status: "SUCCESS",
data: {
answers: [
    "25",
    "20",
    "25",
    "22"
],
isDeleted: false,
_id: "6045c9a32193a43dc4962cd0",
email: "poosapati.raju@nineleaps.com",
empId: "NL-100",
year: "2020",
quarter: "Q4",
project_name: "PEP",
total: 70,
feedback: "Outstanding Performance",
createdAt: "2021-03-09T11:34:15.300Z",
updatedAt: "2021-03-10T11:34:15.300Z",
}
},
ScoreSheetAnsByProject:
{
    status: "SUCCESS",
    data: {
        questions: [
            "Effort",
            "Quality of deliverables",
            "Problem Solving Skills",
            "Ways of Working"
        ],
        answers: [
            "20",
            "19",
            "20",
            "22"
        ],
        total: 81,
        feedback: "Good",
        average: 81
    
    }
},
ScoreSheetAnsAverageResponse:
{
    status: "SUCCESS",
    data: {
        average: 86.75,
        maxScore: 100
    }
},
ScoreSheetAnswerDeleteResponse:
                {
                    status: "DELETED"
                },
                SelfEvalPostResponse:
                {
                    
    status: "CREATED",
    data: {
        questions: [
            {
                "question": "What was your role in the project?",
                "mandatory": true,
                "displayOrder": "1"
            },
            {
                "question": "What are the key features of your project?",
                "mandatory": true,
                "displayOrder": "2"
            },
            {
                "question": "What are your most significant achievements and contributions in the past quarter?",
                "mandatory": true,
                "displayOrder": "3"
            },
            
                        ],
                        isActive: true,
                        isDeleted: false,
                        _id: "604f793c5b2546d2c0bea15d",
                        year: "2021",
                        quarter: "Q2",
                        startDate: "2020-12-01T18:30:00.000Z",
                        endDate: "2020-12-18T18:30:00.000Z",
                        createdAt: "2021-03-09T11:34:15.300Z",
                        updatedAt: "2021-03-09T11:34:15.300Z",
                    }
                },
SelfEvalQuestionUpdatedResponse:
        {
            status: "SUCCESS",
    data:
    {
    questions: [
         {
                question: "What was your role in the project?",
                mandatory: true,
                displayOrder: "1"
            },
            {
                question: "What are the key features of your project?",
                mandatory: true,
                displayOrder: "2"
            },
            {
                "question": "What are your most significant achievements and contributions in the past quarter?",
                "mandatory": true,
                "displayOrder": "3"
            }
        ],
        isDeleted: false,
        _id: "6045cb822193a43dc4962cd1",
        year: "2021",
        quarter: "Q2",
        createdAt: "2021-03-09T11:34:15.300Z",
        updatedAt: "2021-03-10T11:34:15.300Z",
    }
},
SelfEvalStatusResponse:
{
    status: "SUCCESS",
    data: {
        isLive: false
    }
},
SelfEvalQuesDeleteResponse:
                {
                    status: "DELETED"
                },
ReportABugResponse:
{status: "CREATED",
data: {
    isActive: true,
    isDeleted: false,
    _id: "6045cc852193a43dc4962cd2",
    empId: "NL-305",
    page: "self assessment",
    description: "no dropdown",
    createdAt: "2021-03-09T11:34:15.300Z",
    updatedAt: "2021-03-09T11:34:15.300Z",
}
},
ReportABugGetResponse:
    {
        status: "SUCCESS",
        data: [
            {
                isActive: true,
                isDeleted: false,
                _id: "6041ffe8f032823f80f955bc",
                empId: "NL-315",
                page: "self assessment",
                description: "no dropdown",
            },
            {
                isActive: true,
                isDeleted: false,
                _id: "6042004bf032823f80f955bd",
                empId: "NL-315",
                page: "self assessment",
                description: "no dropdown",
            },
            
        ]
    },  
    BugReportDeleteResponse:
                {
                    status: "DELETED"
                },
    ScoreSheetQuesDeleteResponse:
                {
                    status: "DELETED"
                },
SelfEvalGetQuestionResponse:
{
        status: "SUCCESS",
    data: {
        questions: [
            {
                question: "What was your role in the project?",
                mandatory: true,
                displayOrder: "1"
            },
            {
                question: "What are the key features of your project?",
                mandatory: true,
                displayOrder: "2"
            },
            {
                question: "What are your most significant achievements and contributions in the past quarter?",
                mandatory: true,
                displayOrder: "3"
            },
        ]
    }
},

        Credentials:{
            $email:'johndoe@nineleaps.com',
            $password:'abcd123',
        },
        AddUser:{
            $email:'johndoe@nineleaps.com',
            $empId:'604b6b3e5a5f0d116da6a7d0',
            $password:'abcd123'
        },
        Addperfevalans:{
            $email:"johndoe@nineleaps.com",
            $empId:"NL-002",
            $year: "2020",
            $quarter:"Q1",
            $answers:["answer1","answer2","answer3"],
            $projectName:"Abc"

        },
        Addproject:{
            $projectId:"001",
            $projectName:"Abc",
            $managerId:"604736b322d2232539df0355",
            $hrId:"60473bdddc95a52a58f1447c",
            $startDate:"01/01/2020",
            $endDate:"01/01/2021"

        },
        Addprojectemployee:{
            $projectId:"6047b058414a4f427aacd51b",
            $empId:"60473b90dc95a52a58f1447b",
            $year:"2020",
            $quarter:"Q1"

        },
        AddScoreSheetAns:{
            $email:"abcdef@nineleaps.com",
            $empId:"NL-002",
            $year:"2020",
            $quarter:"Q1",
            $answers:["01","02","03"],
            $projectName:"Abc",
            $total: 100,
            $feedback: "Outstanding Performance"

        },
        AddScoreSheetQues:{
            $quarter:"Q1",
            $year:"2020",
            $questions: [{
            question: "What was your role in the project?",
            mandatory: true,
            displayOrder: "1"
        },
        {
            question: "What are the key features of your project?",
            mandatory: true,
            displayOrder: "2"
        },
        {
            question: "What are your most significant achievements and contributions in the past quarter?",
            mandatory: true,
            displayOrder: "3"
        }],
            $startDate:"01/01/2020",
            $endDate:"01/01/2021"
        },
        Addselfevalques:{
            $quarter: "Q1",
            $year: "2020",
            $questions: ["Question"],
            $startDate: "01/01/2020",
            $endDate: "01/01/2021"
        },
        AddBugReport:{
            $empId:"NL-002",
            $page:"self assessment",
            $description:"no dropdown"
        }
        
    },
    parameters:{apiPrefix:'api/v1'}
}

const outputFile = './swagger.json'
const endpointsFiles = ['src/providers/routes.ts']

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc)