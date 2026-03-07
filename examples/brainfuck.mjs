export default {
    "version": 1,
    "roots": [
        {
            "position": {
                "left": 16,
                "top": 16
            },
            "tree": {
                "id": "37f9c231-2572-40e9-9d9c-2cda3cc5fe0f",
                "token": "block",
                "value": null,
                "children": [
                    {
                        "id": "57303c68-177d-476a-9797-8b308195783c",
                        "token": "assign",
                        "value": null,
                        "children": [
                            {
                                "id": "5dae5036-c45a-4df9-9a4c-e5c6603701fe",
                                "token": "variable",
                                "value": "is_cmd",
                                "children": []
                            },
                            {
                                "id": "477d09bb-2d56-477c-927e-dfd522cd8bc4",
                                "token": "function",
                                "value": null,
                                "children": [
                                    {
                                        "id": "c889c971-f210-4710-b621-090660047c60",
                                        "token": "block",
                                        "value": null,
                                        "children": [
                                            {
                                                "id": "d8b6a975-886d-4e7a-ba67-e78d895c4c5a",
                                                "token": "param",
                                                "value": {
                                                    "type": "string",
                                                    "name": "ch"
                                                },
                                                "children": []
                                            },
                                            {
                                                "id": "d1a39de2-949d-4b28-afaa-e75fa2008ea2",
                                                "token": "param",
                                                "value": {
                                                    "type": "string",
                                                    "name": "cmd"
                                                },
                                                "children": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": "93b2d4f3-4c5c-4532-ba54-ec2582f8de3c",
                                        "token": "type",
                                        "value": "bool",
                                        "children": []
                                    },
                                    {
                                        "id": "581201e9-1017-41c4-a286-b0f49f672657",
                                        "token": "return",
                                        "value": null,
                                        "children": [
                                            {
                                                "id": "6a7990f6-d3ea-4248-84df-cef8160d663d",
                                                "token": "call",
                                                "value": null,
                                                "children": [
                                                    {
                                                        "id": "691c2ec3-e203-4796-8443-beee9a096cf1",
                                                        "token": "variable",
                                                        "value": "and",
                                                        "children": []
                                                    },
                                                    {
                                                        "id": "23dc908b-7c8c-4a51-be3c-065600a550e3",
                                                        "token": "call",
                                                        "value": null,
                                                        "children": [
                                                            {
                                                                "id": "3fcf16ec-4dba-4c13-9048-0d211a15b698",
                                                                "token": "variable",
                                                                "value": "startsWith",
                                                                "children": []
                                                            },
                                                            {
                                                                "id": "9ebf2a68-585c-4e83-a49c-a768a6ec96c0",
                                                                "token": "variable",
                                                                "value": "ch",
                                                                "children": []
                                                            },
                                                            {
                                                                "id": "da5a3697-3534-48ca-9a33-196a980f43ba",
                                                                "token": "variable",
                                                                "value": "cmd",
                                                                "children": []
                                                            }
                                                        ],
                                                        "ui": {
                                                            "callMode": "fixed",
                                                            "callOperation": "startsWith"
                                                        }
                                                    },
                                                    {
                                                        "id": "7f84edae-58f9-40b3-9cbd-70732b9c5e81",
                                                        "token": "call",
                                                        "value": null,
                                                        "children": [
                                                            {
                                                                "id": "6789e541-8bfd-4fbc-8811-5644dda84a37",
                                                                "token": "variable",
                                                                "value": "endsWith",
                                                                "children": []
                                                            },
                                                            {
                                                                "id": "3a260105-ee8b-42cb-a3f1-402db78195a4",
                                                                "token": "variable",
                                                                "value": "ch",
                                                                "children": []
                                                            },
                                                            {
                                                                "id": "b8d4658a-a699-4fc7-bd82-5a79e63a869e",
                                                                "token": "variable",
                                                                "value": "cmd",
                                                                "children": []
                                                            }
                                                        ],
                                                        "ui": {
                                                            "callMode": "fixed",
                                                            "callOperation": "endsWith"
                                                        }
                                                    }
                                                ],
                                                "ui": {
                                                    "callMode": "fixed",
                                                    "callOperation": "and"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "bc8417ae-93c9-4f49-8966-74c3a3fdbf26",
                        "token": "assign",
                        "value": null,
                        "children": [
                            {
                                "id": "9c16b82d-38fe-4306-8c14-c85aeada4537",
                                "token": "variable",
                                "value": "run_bf",
                                "children": []
                            },
                            {
                                "id": "c3eac0e7-06d2-4a00-bcd1-14a63e1da092",
                                "token": "function",
                                "value": null,
                                "children": [
                                    {
                                        "id": "e7d6d8bb-774f-4040-89e5-c8fc15807982",
                                        "token": "block",
                                        "value": null,
                                        "children": [
                                            {
                                                "id": "979989b1-0037-4079-b095-d96d1d0dff1a",
                                                "token": "param",
                                                "value": {
                                                    "type": "string",
                                                    "name": "code"
                                                },
                                                "children": []
                                            },
                                            {
                                                "id": "a7ecba3f-a0be-41a0-9fd7-5e2a425d2545",
                                                "token": "param",
                                                "value": {
                                                    "type": "array",
                                                    "name": "input"
                                                },
                                                "children": []
                                            }
                                        ]
                                    },
                                    {
                                        "id": "279dcbbb-ddb1-4f6e-a32d-5093d0779c73",
                                        "token": "type",
                                        "value": "array",
                                        "children": []
                                    },
                                    {
                                        "id": "7b80c047-f667-477d-abdb-836f75efd4db",
                                        "token": "block",
                                        "value": null,
                                        "children": [
                                            {
                                                "id": "f3cc244a-f65e-4f99-960b-e2e1a37ac653",
                                                "token": "assign",
                                                "value": null,
                                                "children": [
                                                    {
                                                        "id": "942f9ffa-4b9b-493b-8a0b-c054d334ba88",
                                                        "token": "variable",
                                                        "value": "tape",
                                                        "children": []
                                                    },
                                                    {
                                                        "id": "5501eb40-e0fb-4ce8-b9cb-3c75af887733",
                                                        "token": "array",
                                                        "value": null,
                                                        "children": []
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "88f686a2-2bdb-4912-bb9b-72a3697b7dfb",
                                                "token": "for",
                                                "value": null,
                                                "children": [
                                                    {
                                                        "id": "c62d4e54-a4f1-4bd4-b05a-e0daa6e0bd5a",
                                                        "token": "assign",
                                                        "value": null,
                                                        "children": [
                                                            {
                                                                "id": "8702e277-3e92-4829-912e-9b7a89344dd0",
                                                                "token": "variable",
                                                                "value": "i",
                                                                "children": []
                                                            },
                                                            {
                                                                "id": "c41ab909-d4bd-41bf-a0cd-4d65fd8dd97c",
                                                                "token": "number",
                                                                "value": 0,
                                                                "children": []
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "id": "d8323f49-bcbc-47a0-bd50-49a56ff2f610",
                                                        "token": "call",
                                                        "value": null,
                                                        "children": [
                                                            {
                                                                "id": "ee9c50b1-7a1c-45c1-b9b4-2c7265473705",
                                                                "token": "variable",
                                                                "value": "<",
                                                                "children": []
                                                            },
                                                            {
                                                                "id": "df77567f-0c25-474f-ae59-19fec7d8c0c7",
                                                                "token": "variable",
                                                                "value": "i",
                                                                "children": []
                                                            },
                                                            {
                                                                "id": "76156780-9c39-42ca-9d4f-dfc538078167",
                                                                "token": "number",
                                                                "value": 64,
                                                                "children": []
                                                            }
                                                        ],
                                                        "ui": {
                                                            "callMode": "fixed",
                                                            "callOperation": "<"
                                                        }
                                                    },
                                                    {
                                                        "id": "a9afb19b-82dc-484f-8d10-bb40d2bde81f",
                                                        "token": "assign",
                                                        "value": null,
                                                        "children": [
                                                            {
                                                                "id": "2fa29ae7-b7e6-43ee-8f07-93888d86e6e0",
                                                                "token": "variable",
                                                                "value": "i",
                                                                "children": []
                                                            },
                                                            {
                                                                "id": "eefa1168-c9f2-40aa-ba93-54df6431fb26",
                                                                "token": "call",
                                                                "value": null,
                                                                "children": [
                                                                    {
                                                                        "id": "26520af2-87f5-4b83-ab0c-f78dba7e8bb1",
                                                                        "token": "variable",
                                                                        "value": "+",
                                                                        "children": []
                                                                    },
                                                                    {
                                                                        "id": "5115dc17-d899-4114-8f09-ee1a7ab7b946",
                                                                        "token": "variable",
                                                                        "value": "i",
                                                                        "children": []
                                                                    },
                                                                    {
                                                                        "id": "b0f17e8a-8472-4221-9502-eadf3564f917",
                                                                        "token": "number",
                                                                        "value": 1,
                                                                        "children": []
                                                                    }
                                                                ],
                                                                "ui": {
                                                                    "callMode": "fixed",
                                                                    "callOperation": "+"
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "id": "9acace2c-86e6-42b8-bbfb-468201c32dfc",
                                                        "token": "block",
                                                        "value": null,
                                                        "children": [
                                                            {
                                                                "id": "c2b8603b-c442-411b-b425-9cd9b43ccf69",
                                                                "token": "call",
                                                                "value": null,
                                                                "children": [
                                                                    {
                                                                        "id": "37ff153c-cf4b-4607-bcf1-8693b0621cae",
                                                                        "token": "variable",
                                                                        "value": "push",
                                                                        "children": []
                                                                    },
                                                                    {
                                                                        "id": "3bf0b739-d87a-49e0-8c18-c86b69200d3d",
                                                                        "token": "variable",
                                                                        "value": "tape",
                                                                        "children": []
                                                                    },
                                                                    {
                                                                        "id": "f19a7f2b-a8a7-4a96-90fc-6bafda8b3a63",
                                                                        "token": "number",
                                                                        "value": 0,
                                                                        "children": []
                                                                    }
                                                                ],
                                                                "ui": {
                                                                    "callMode": "fixed",
                                                                    "callOperation": "push"
                                                                }
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "d9e24548-1bb8-4e76-8fef-7247a6ebf917",
                                                "token": "assign",
                                                "value": null,
                                                "children": [
                                                    {
                                                        "id": "a6a4a6c9-2a69-4e20-b8a2-4c25410c29bf",
                                                        "token": "variable",
                                                        "value": "output",
                                                        "children": []
                                                    },
                                                    {
                                                        "id": "9d46587f-7cd3-43ae-bff3-0afef9fa9dee",
                                                        "token": "array",
                                                        "value": null,
                                                        "children": []
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "8f19daa6-91d6-48b8-9670-984825f6a04e",
                                                "token": "assign",
                                                "value": null,
                                                "children": [
                                                    {
                                                        "id": "a6b794f9-d346-416f-9113-2a85976bcdef",
                                                        "token": "variable",
                                                        "value": "ip",
                                                        "children": []
                                                    },
                                                    {
                                                        "id": "e1b0cd99-33e2-4deb-8276-16cc904b4e5a",
                                                        "token": "number",
                                                        "value": 0,
                                                        "children": []
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "c59aa346-eb77-4c29-9d4f-da20facab42c",
                                                "token": "assign",
                                                "value": null,
                                                "children": [
                                                    {
                                                        "id": "dc1aa686-b815-467c-ab56-09cb55a6b2e8",
                                                        "token": "variable",
                                                        "value": "ptr",
                                                        "children": []
                                                    },
                                                    {
                                                        "id": "a74e77b3-26f9-4d31-98ee-385db0b71a61",
                                                        "token": "number",
                                                        "value": 0,
                                                        "children": []
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "4ae9e3fe-7e2d-4da3-885f-efb709e7b4c0",
                                                "token": "assign",
                                                "value": null,
                                                "children": [
                                                    {
                                                        "id": "9fb49cff-7a97-42e1-8e76-77508b84d85c",
                                                        "token": "variable",
                                                        "value": "inp_ptr",
                                                        "children": []
                                                    },
                                                    {
                                                        "id": "4523d421-ddbf-4c36-bd2b-bda3108ac8c2",
                                                        "token": "number",
                                                        "value": 0,
                                                        "children": []
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "b9f0a6ca-e0a5-425b-904d-51afd7c98168",
                                                "token": "while",
                                                "value": null,
                                                "children": [
                                                    {
                                                        "id": "ae4cdc68-7a5c-477c-92cb-803f4e263839",
                                                        "token": "call",
                                                        "value": null,
                                                        "children": [
                                                            {
                                                                "id": "b61ed8f8-3e17-4602-8c24-0d859054cd8e",
                                                                "token": "variable",
                                                                "value": "<",
                                                                "children": []
                                                            },
                                                            {
                                                                "id": "1c6ea295-03ba-4598-ab71-78d686d8acdc",
                                                                "token": "variable",
                                                                "value": "ip",
                                                                "children": []
                                                            },
                                                            {
                                                                "id": "f831ca62-1414-4997-9b94-0832a53b92dc",
                                                                "token": "call",
                                                                "value": null,
                                                                "children": [
                                                                    {
                                                                        "id": "be5332f7-4c93-4ecd-8dc1-b0d1cc2f3c5e",
                                                                        "token": "variable",
                                                                        "value": "strlen",
                                                                        "children": []
                                                                    },
                                                                    {
                                                                        "id": "12580560-4cc2-4890-9891-52758f7c298d",
                                                                        "token": "variable",
                                                                        "value": "code",
                                                                        "children": []
                                                                    }
                                                                ],
                                                                "ui": {
                                                                    "callMode": "fixed",
                                                                    "callOperation": "strlen"
                                                                }
                                                            }
                                                        ],
                                                        "ui": {
                                                            "callMode": "fixed",
                                                            "callOperation": "<"
                                                        }
                                                    },
                                                    {
                                                        "id": "3b256e03-8cac-4d3c-9862-092b0d618fd4",
                                                        "token": "block",
                                                        "value": null,
                                                        "children": [
                                                            {
                                                                "id": "fd8bfa18-f51e-4498-aeaa-c14093f9af6c",
                                                                "token": "assign",
                                                                "value": null,
                                                                "children": [
                                                                    {
                                                                        "id": "bf808df0-6cd5-43e9-aa30-127acba818fa",
                                                                        "token": "variable",
                                                                        "value": "cmd",
                                                                        "children": []
                                                                    },
                                                                    {
                                                                        "id": "cfe4995f-91dd-4de6-adaa-6f40133f3776",
                                                                        "token": "call",
                                                                        "value": null,
                                                                        "children": [
                                                                            {
                                                                                "id": "ea1d976a-506c-41da-83c8-1df84c8d9281",
                                                                                "token": "variable",
                                                                                "value": "charAt",
                                                                                "children": []
                                                                            },
                                                                            {
                                                                                "id": "821c64d9-29a7-4f22-9716-c60fa6a1aa87",
                                                                                "token": "variable",
                                                                                "value": "code",
                                                                                "children": []
                                                                            },
                                                                            {
                                                                                "id": "b4f35b33-40bd-4518-9e65-46e26cb7b9bc",
                                                                                "token": "variable",
                                                                                "value": "ip",
                                                                                "children": []
                                                                            }
                                                                        ],
                                                                        "ui": {
                                                                            "callMode": "fixed",
                                                                            "callOperation": "charAt"
                                                                        }
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "id": "383140e2-9c43-4328-823f-a633103133b0",
                                                                "token": "if",
                                                                "value": null,
                                                                "children": [
                                                                    {
                                                                        "id": "0cc9b22b-2e13-49a8-9a6d-241d4b297451",
                                                                        "token": "call",
                                                                        "value": null,
                                                                        "children": [
                                                                            {
                                                                                "id": "224b6c03-e0e6-4ae0-ab7d-7c6ae1874083",
                                                                                "token": "variable",
                                                                                "value": "is_cmd",
                                                                                "children": []
                                                                            },
                                                                            {
                                                                                "id": "96bdbb1b-3ef9-4c79-b7cd-5004c0024dfb",
                                                                                "token": "variable",
                                                                                "value": "cmd",
                                                                                "children": []
                                                                            },
                                                                            {
                                                                                "id": "928a0b32-d524-4968-8722-f862c1d343b5",
                                                                                "token": "string",
                                                                                "value": ">",
                                                                                "children": []
                                                                            }
                                                                        ],
                                                                        "ui": {
                                                                            "callMode": "generic"
                                                                        }
                                                                    },
                                                                    {
                                                                        "id": "c5233f67-80fd-4fe4-8589-accf62b15e6d",
                                                                        "token": "block",
                                                                        "value": null,
                                                                        "children": [
                                                                            {
                                                                                "id": "fc4de817-1526-43de-a716-680fadca3d12",
                                                                                "token": "assign",
                                                                                "value": null,
                                                                                "children": [
                                                                                    {
                                                                                        "id": "969b6531-e0ca-4c09-b185-3f4bc344a4c4",
                                                                                        "token": "variable",
                                                                                        "value": "ptr",
                                                                                        "children": []
                                                                                    },
                                                                                    {
                                                                                        "id": "200a3af6-38b6-4a5e-9e27-08b7d86d3f56",
                                                                                        "token": "call",
                                                                                        "value": null,
                                                                                        "children": [
                                                                                            {
                                                                                                "id": "883ddd94-be27-41e1-ad94-ec723b060d9f",
                                                                                                "token": "variable",
                                                                                                "value": "+",
                                                                                                "children": []
                                                                                            },
                                                                                            {
                                                                                                "id": "e9cee738-e102-4a93-a1a4-facb7116d337",
                                                                                                "token": "variable",
                                                                                                "value": "ptr",
                                                                                                "children": []
                                                                                            },
                                                                                            {
                                                                                                "id": "a81758fa-a4a4-460f-a4e2-52928b03e555",
                                                                                                "token": "number",
                                                                                                "value": 1,
                                                                                                "children": []
                                                                                            }
                                                                                        ],
                                                                                        "ui": {
                                                                                            "callMode": "fixed",
                                                                                            "callOperation": "+"
                                                                                        }
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "id": "a57a8e1d-8bd0-4a30-b523-6367cbad196a",
                                                                                "token": "if",
                                                                                "value": null,
                                                                                "children": [
                                                                                    {
                                                                                        "id": "0491bda8-7703-4aef-b04b-8c7a4593c744",
                                                                                        "token": "call",
                                                                                        "value": null,
                                                                                        "children": [
                                                                                            {
                                                                                                "id": "7c75b263-d635-457a-9937-cf7059fa9a3e",
                                                                                                "token": "variable",
                                                                                                "value": ">=",
                                                                                                "children": []
                                                                                            },
                                                                                            {
                                                                                                "id": "a99df7ca-adfb-4d94-b2a7-393a0d7c1cc5",
                                                                                                "token": "variable",
                                                                                                "value": "ptr",
                                                                                                "children": []
                                                                                            },
                                                                                            {
                                                                                                "id": "d7ace2fc-1d09-48f9-a14a-7c750392e901",
                                                                                                "token": "call",
                                                                                                "value": null,
                                                                                                "children": [
                                                                                                    {
                                                                                                        "id": "70c2f33f-0b06-403f-9b30-d9b1842709d8",
                                                                                                        "token": "variable",
                                                                                                        "value": "len",
                                                                                                        "children": []
                                                                                                    },
                                                                                                    {
                                                                                                        "id": "62047e12-7e89-4a71-9bad-f543784c6b8f",
                                                                                                        "token": "variable",
                                                                                                        "value": "tape",
                                                                                                        "children": []
                                                                                                    }
                                                                                                ],
                                                                                                "ui": {
                                                                                                    "callMode": "fixed",
                                                                                                    "callOperation": "len"
                                                                                                }
                                                                                            }
                                                                                        ],
                                                                                        "ui": {
                                                                                            "callMode": "fixed",
                                                                                            "callOperation": ">="
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "id": "b4b82bae-bb60-4ba6-b762-78cc60607968",
                                                                                        "token": "assign",
                                                                                        "value": null,
                                                                                        "children": [
                                                                                            {
                                                                                                "id": "5261f899-0979-44b0-80fb-5205a447338c",
                                                                                                "token": "variable",
                                                                                                "value": "ptr",
                                                                                                "children": []
                                                                                            },
                                                                                            {
                                                                                                "id": "91216240-d0fa-44a5-8c4e-03442eed5964",
                                                                                                "token": "number",
                                                                                                "value": 0,
                                                                                                "children": []
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "id": "23cfc3bb-8e4b-4603-b45c-6ca24aff8ad3",
                                                                                        "token": "block",
                                                                                        "value": null,
                                                                                        "children": []
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        "id": "d19973eb-ea5b-4224-8842-417c96a13c7b",
                                                                        "token": "if",
                                                                        "value": null,
                                                                        "children": [
                                                                            {
                                                                                "id": "a8d6e07e-088a-4ee7-929f-29bdffb299ae",
                                                                                "token": "call",
                                                                                "value": null,
                                                                                "children": [
                                                                                    {
                                                                                        "id": "8fbd8083-e3a5-4f22-83df-92dea898d8d7",
                                                                                        "token": "variable",
                                                                                        "value": "is_cmd",
                                                                                        "children": []
                                                                                    },
                                                                                    {
                                                                                        "id": "d9c2b14c-3c04-4ecb-806c-f12ea2b16fed",
                                                                                        "token": "variable",
                                                                                        "value": "cmd",
                                                                                        "children": []
                                                                                    },
                                                                                    {
                                                                                        "id": "f095bc36-db90-4c44-b7df-8e962721fe7f",
                                                                                        "token": "string",
                                                                                        "value": "<",
                                                                                        "children": []
                                                                                    }
                                                                                ],
                                                                                "ui": {
                                                                                    "callMode": "generic"
                                                                                }
                                                                            },
                                                                            {
                                                                                "id": "dbe8c9c3-cd71-48da-8b01-9a57b759b3dd",
                                                                                "token": "block",
                                                                                "value": null,
                                                                                "children": [
                                                                                    {
                                                                                        "id": "e1b6bacc-c33d-4dcc-a7a9-5dbfc93f2303",
                                                                                        "token": "assign",
                                                                                        "value": null,
                                                                                        "children": [
                                                                                            {
                                                                                                "id": "96aebb25-568b-4a91-a96f-a5414ad4680e",
                                                                                                "token": "variable",
                                                                                                "value": "ptr",
                                                                                                "children": []
                                                                                            },
                                                                                            {
                                                                                                "id": "84dd528c-e8a9-4e62-aeaf-55282c10776e",
                                                                                                "token": "call",
                                                                                                "value": null,
                                                                                                "children": [
                                                                                                    {
                                                                                                        "id": "ae435adf-d872-45a3-8a4b-ab00ce216dd4",
                                                                                                        "token": "variable",
                                                                                                        "value": "-",
                                                                                                        "children": []
                                                                                                    },
                                                                                                    {
                                                                                                        "id": "a67f5ad7-65db-4201-8fa5-d04afacca6b0",
                                                                                                        "token": "variable",
                                                                                                        "value": "ptr",
                                                                                                        "children": []
                                                                                                    },
                                                                                                    {
                                                                                                        "id": "e7ffd951-d692-49fd-9a3e-daf321b65994",
                                                                                                        "token": "number",
                                                                                                        "value": 1,
                                                                                                        "children": []
                                                                                                    }
                                                                                                ],
                                                                                                "ui": {
                                                                                                    "callMode": "fixed",
                                                                                                    "callOperation": "-"
                                                                                                }
                                                                                            }
                                                                                        ]
                                                                                    },
                                                                                    {
                                                                                        "id": "e2e2721b-42ed-420f-a1ae-2acd45514ad8",
                                                                                        "token": "if",
                                                                                        "value": null,
                                                                                        "children": [
                                                                                            {
                                                                                                "id": "c099e81a-7573-4dd6-ad93-5015868e6f73",
                                                                                                "token": "call",
                                                                                                "value": null,
                                                                                                "children": [
                                                                                                    {
                                                                                                        "id": "a2a97120-166b-4eb4-8882-e149cda088be",
                                                                                                        "token": "variable",
                                                                                                        "value": "<",
                                                                                                        "children": []
                                                                                                    },
                                                                                                    {
                                                                                                        "id": "7dbff814-e7f2-4647-937a-aeab0b26ef00",
                                                                                                        "token": "variable",
                                                                                                        "value": "ptr",
                                                                                                        "children": []
                                                                                                    },
                                                                                                    {
                                                                                                        "id": "527c76d0-1719-414e-a6ff-82cb30edb03c",
                                                                                                        "token": "number",
                                                                                                        "value": 0,
                                                                                                        "children": []
                                                                                                    }
                                                                                                ],
                                                                                                "ui": {
                                                                                                    "callMode": "fixed",
                                                                                                    "callOperation": "<"
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                "id": "fe0e53aa-4444-439b-b1c9-c48c2c604193",
                                                                                                "token": "assign",
                                                                                                "value": null,
                                                                                                "children": [
                                                                                                    {
                                                                                                        "id": "5d7e4bea-ce99-4606-a4f2-f05fec57e2ba",
                                                                                                        "token": "variable",
                                                                                                        "value": "ptr",
                                                                                                        "children": []
                                                                                                    },
                                                                                                    {
                                                                                                        "id": "348b3b2f-b884-4860-9082-ab3bd4b2816b",
                                                                                                        "token": "call",
                                                                                                        "value": null,
                                                                                                        "children": [
                                                                                                            {
                                                                                                                "id": "ad8b7649-9766-42c6-85cb-1eb54760f823",
                                                                                                                "token": "variable",
                                                                                                                "value": "-",
                                                                                                                "children": []
                                                                                                            },
                                                                                                            {
                                                                                                                "id": "ffb4e8ed-1b87-4723-90d5-0e060e34f476",
                                                                                                                "token": "call",
                                                                                                                "value": null,
                                                                                                                "children": [
                                                                                                                    {
                                                                                                                        "id": "21439635-9cbc-4aab-9d24-6345d4ce85d6",
                                                                                                                        "token": "variable",
                                                                                                                        "value": "len",
                                                                                                                        "children": []
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "id": "1d0c7ccd-c8f5-4c43-a29d-be3301b09415",
                                                                                                                        "token": "variable",
                                                                                                                        "value": "tape",
                                                                                                                        "children": []
                                                                                                                    }
                                                                                                                ],
                                                                                                                "ui": {
                                                                                                                    "callMode": "fixed",
                                                                                                                    "callOperation": "len"
                                                                                                                }
                                                                                                            },
                                                                                                            {
                                                                                                                "id": "93ccfd67-ac7a-4b8f-b6ae-dbed300d12e0",
                                                                                                                "token": "number",
                                                                                                                "value": 1,
                                                                                                                "children": []
                                                                                                            }
                                                                                                        ],
                                                                                                        "ui": {
                                                                                                            "callMode": "fixed",
                                                                                                            "callOperation": "-"
                                                                                                        }
                                                                                                    }
                                                                                                ]
                                                                                            },
                                                                                            {
                                                                                                "id": "fa5b6d17-36fb-436e-b3ff-f0f7f819ed31",
                                                                                                "token": "block",
                                                                                                "value": null,
                                                                                                "children": []
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            },
                                                                            {
                                                                                "id": "a5116f92-21a7-488d-b891-965de9a8eacd",
                                                                                "token": "if",
                                                                                "value": null,
                                                                                "children": [
                                                                                    {
                                                                                        "id": "b831543a-6738-4786-be14-aa1890471747",
                                                                                        "token": "call",
                                                                                        "value": null,
                                                                                        "children": [
                                                                                            {
                                                                                                "id": "3dd21ccc-35e1-4525-9f59-3514e7a593c7",
                                                                                                "token": "variable",
                                                                                                "value": "is_cmd",
                                                                                                "children": []
                                                                                            },
                                                                                            {
                                                                                                "id": "44e08b65-54fd-4081-9f4b-d951740d8582",
                                                                                                "token": "variable",
                                                                                                "value": "cmd",
                                                                                                "children": []
                                                                                            },
                                                                                            {
                                                                                                "id": "d665916b-b538-4467-993a-defb1a74f59b",
                                                                                                "token": "string",
                                                                                                "value": "+",
                                                                                                "children": []
                                                                                            }
                                                                                        ],
                                                                                        "ui": {
                                                                                            "callMode": "generic"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "id": "276d4d9a-1207-446c-be03-1e95e89128ea",
                                                                                        "token": "call",
                                                                                        "value": null,
                                                                                        "children": [
                                                                                            {
                                                                                                "id": "8fe26eee-551f-4e2f-a515-bc28ab0a6cd8",
                                                                                                "token": "variable",
                                                                                                "value": "set_at",
                                                                                                "children": []
                                                                                            },
                                                                                            {
                                                                                                "id": "079566cd-054f-45ef-9cf1-4e20c9b19de7",
                                                                                                "token": "variable",
                                                                                                "value": "tape",
                                                                                                "children": []
                                                                                            },
                                                                                            {
                                                                                                "id": "9156e9e7-090d-4135-8239-d2f2aaea4342",
                                                                                                "token": "call",
                                                                                                "value": null,
                                                                                                "children": [
                                                                                                    {
                                                                                                        "id": "79fcc0ce-9bb6-40e4-8e5f-4c6e91396b26",
                                                                                                        "token": "variable",
                                                                                                        "value": "+",
                                                                                                        "children": []
                                                                                                    },
                                                                                                    {
                                                                                                        "id": "812af6de-1d76-4f1f-91f9-817b57a1712c",
                                                                                                        "token": "call",
                                                                                                        "value": null,
                                                                                                        "children": [
                                                                                                            {
                                                                                                                "id": "a387a45b-c38b-41b1-8a93-ac4ba626edc1",
                                                                                                                "token": "variable",
                                                                                                                "value": "at",
                                                                                                                "children": []
                                                                                                            },
                                                                                                            {
                                                                                                                "id": "cf67c0d0-7267-47fa-b775-839827efc7b9",
                                                                                                                "token": "variable",
                                                                                                                "value": "tape",
                                                                                                                "children": []
                                                                                                            },
                                                                                                            {
                                                                                                                "id": "5d9d2418-1305-4bba-b966-5a351e396165",
                                                                                                                "token": "variable",
                                                                                                                "value": "ptr",
                                                                                                                "children": []
                                                                                                            }
                                                                                                        ],
                                                                                                        "ui": {
                                                                                                            "callMode": "fixed",
                                                                                                            "callOperation": "at"
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        "id": "a4d792ee-6e5d-44e4-bad3-4e4b832c43b6",
                                                                                                        "token": "number",
                                                                                                        "value": 1,
                                                                                                        "children": []
                                                                                                    }
                                                                                                ],
                                                                                                "ui": {
                                                                                                    "callMode": "fixed",
                                                                                                    "callOperation": "+"
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                "id": "bc7b8cad-f17f-47a2-951d-e8f153fddda4",
                                                                                                "token": "variable",
                                                                                                "value": "ptr",
                                                                                                "children": []
                                                                                            }
                                                                                        ],
                                                                                        "ui": {
                                                                                            "callMode": "fixed",
                                                                                            "callOperation": "set_at"
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        "id": "9019df00-0aa3-4383-8fc6-206ec36a5b12",
                                                                                        "token": "if",
                                                                                        "value": null,
                                                                                        "children": [
                                                                                            {
                                                                                                "id": "3ac53782-77b6-4bc1-9e26-328ceafd03a3",
                                                                                                "token": "call",
                                                                                                "value": null,
                                                                                                "children": [
                                                                                                    {
                                                                                                        "id": "9c0d7bb1-a336-4d25-b46b-bba5300d2d8e",
                                                                                                        "token": "variable",
                                                                                                        "value": "is_cmd",
                                                                                                        "children": []
                                                                                                    },
                                                                                                    {
                                                                                                        "id": "52b4cf85-5239-4dc3-90f3-83e2c4321bb4",
                                                                                                        "token": "variable",
                                                                                                        "value": "cmd",
                                                                                                        "children": []
                                                                                                    },
                                                                                                    {
                                                                                                        "id": "5387bf55-fe40-455c-b62f-12f3c334e60d",
                                                                                                        "token": "string",
                                                                                                        "value": "-",
                                                                                                        "children": []
                                                                                                    }
                                                                                                ],
                                                                                                "ui": {
                                                                                                    "callMode": "generic"
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                "id": "c1d33ea1-a61a-4a0d-88e5-5bbb6da8f0c1",
                                                                                                "token": "call",
                                                                                                "value": null,
                                                                                                "children": [
                                                                                                    {
                                                                                                        "id": "cc761578-180d-4f39-b0e0-935bd10e0865",
                                                                                                        "token": "variable",
                                                                                                        "value": "set_at",
                                                                                                        "children": []
                                                                                                    },
                                                                                                    {
                                                                                                        "id": "e2899e47-fd38-4db6-a880-b67411f14238",
                                                                                                        "token": "variable",
                                                                                                        "value": "tape",
                                                                                                        "children": []
                                                                                                    },
                                                                                                    {
                                                                                                        "id": "e8aa7c7a-e448-4c5d-8c71-bfcd04b6efe9",
                                                                                                        "token": "call",
                                                                                                        "value": null,
                                                                                                        "children": [
                                                                                                            {
                                                                                                                "id": "54c56b11-2397-4493-9ec5-4898d1636e77",
                                                                                                                "token": "variable",
                                                                                                                "value": "-",
                                                                                                                "children": []
                                                                                                            },
                                                                                                            {
                                                                                                                "id": "27fe159b-111f-4aa2-8c91-2f3b853a1030",
                                                                                                                "token": "call",
                                                                                                                "value": null,
                                                                                                                "children": [
                                                                                                                    {
                                                                                                                        "id": "6a5c28e7-9d7f-4a9a-8e79-5b72ba04c755",
                                                                                                                        "token": "variable",
                                                                                                                        "value": "at",
                                                                                                                        "children": []
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "id": "14411750-8f43-47ea-bbef-f6831349be28",
                                                                                                                        "token": "variable",
                                                                                                                        "value": "tape",
                                                                                                                        "children": []
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "id": "5d137ad5-917a-4e28-a043-650670a2c09b",
                                                                                                                        "token": "variable",
                                                                                                                        "value": "ptr",
                                                                                                                        "children": []
                                                                                                                    }
                                                                                                                ],
                                                                                                                "ui": {
                                                                                                                    "callMode": "fixed",
                                                                                                                    "callOperation": "at"
                                                                                                                }
                                                                                                            },
                                                                                                            {
                                                                                                                "id": "5787ba75-145d-4ad6-8604-a5d7c3f8c5df",
                                                                                                                "token": "number",
                                                                                                                "value": 1,
                                                                                                                "children": []
                                                                                                            }
                                                                                                        ],
                                                                                                        "ui": {
                                                                                                            "callMode": "fixed",
                                                                                                            "callOperation": "-"
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        "id": "fbcb8a8b-b8b1-4122-bedc-8211218772ea",
                                                                                                        "token": "variable",
                                                                                                        "value": "ptr",
                                                                                                        "children": []
                                                                                                    }
                                                                                                ],
                                                                                                "ui": {
                                                                                                    "callMode": "fixed",
                                                                                                    "callOperation": "set_at"
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                "id": "9446d3e1-05b3-40c8-b8b5-c0dca784c80f",
                                                                                                "token": "if",
                                                                                                "value": null,
                                                                                                "children": [
                                                                                                    {
                                                                                                        "id": "65dbebc2-9867-45e3-8c40-2ce9557cd895",
                                                                                                        "token": "call",
                                                                                                        "value": null,
                                                                                                        "children": [
                                                                                                            {
                                                                                                                "id": "2f77340e-3f2d-472d-8edb-05846da33441",
                                                                                                                "token": "variable",
                                                                                                                "value": "is_cmd",
                                                                                                                "children": []
                                                                                                            },
                                                                                                            {
                                                                                                                "id": "6d2f560b-4962-4a2d-a2be-35ffbb7e5542",
                                                                                                                "token": "variable",
                                                                                                                "value": "cmd",
                                                                                                                "children": []
                                                                                                            },
                                                                                                            {
                                                                                                                "id": "40e62af4-fa19-423a-a5ea-65214be7f1d8",
                                                                                                                "token": "string",
                                                                                                                "value": ".",
                                                                                                                "children": []
                                                                                                            }
                                                                                                        ],
                                                                                                        "ui": {
                                                                                                            "callMode": "generic"
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        "id": "ed41d51f-a2ae-41af-a3fb-9a03d1f4d559",
                                                                                                        "token": "call",
                                                                                                        "value": null,
                                                                                                        "children": [
                                                                                                            {
                                                                                                                "id": "4ee0b99a-4f9a-4e41-90ac-c715d20a07c9",
                                                                                                                "token": "variable",
                                                                                                                "value": "push",
                                                                                                                "children": []
                                                                                                            },
                                                                                                            {
                                                                                                                "id": "a78d0739-22c8-4ede-bd15-f7ba75d91cbd",
                                                                                                                "token": "variable",
                                                                                                                "value": "output",
                                                                                                                "children": []
                                                                                                            },
                                                                                                            {
                                                                                                                "id": "e36094bd-1e4a-455b-b477-8e9db1ad35e1",
                                                                                                                "token": "call",
                                                                                                                "value": null,
                                                                                                                "children": [
                                                                                                                    {
                                                                                                                        "id": "f669e3cf-c384-4384-9952-920c907922e7",
                                                                                                                        "token": "variable",
                                                                                                                        "value": "at",
                                                                                                                        "children": []
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "id": "7463470a-fcdd-4678-82cc-39a33d365b42",
                                                                                                                        "token": "variable",
                                                                                                                        "value": "tape",
                                                                                                                        "children": []
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "id": "49619781-a923-434f-81b1-35a65ae2555f",
                                                                                                                        "token": "variable",
                                                                                                                        "value": "ptr",
                                                                                                                        "children": []
                                                                                                                    }
                                                                                                                ],
                                                                                                                "ui": {
                                                                                                                    "callMode": "fixed",
                                                                                                                    "callOperation": "at"
                                                                                                                }
                                                                                                            }
                                                                                                        ],
                                                                                                        "ui": {
                                                                                                            "callMode": "fixed",
                                                                                                            "callOperation": "push"
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        "id": "80dd9043-4d8f-4b02-87ae-7e3674076e7d",
                                                                                                        "token": "if",
                                                                                                        "value": null,
                                                                                                        "children": [
                                                                                                            {
                                                                                                                "id": "bb5ca721-68c3-462c-80aa-9948d5c17c8a",
                                                                                                                "token": "call",
                                                                                                                "value": null,
                                                                                                                "children": [
                                                                                                                    {
                                                                                                                        "id": "1eb46ea8-ddf5-4752-83b8-d55c28242996",
                                                                                                                        "token": "variable",
                                                                                                                        "value": "is_cmd",
                                                                                                                        "children": []
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "id": "58bdd0be-2fc8-4ef5-a22b-487618f51344",
                                                                                                                        "token": "variable",
                                                                                                                        "value": "cmd",
                                                                                                                        "children": []
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "id": "72bf0f5e-4191-491b-9b3b-bea827eb55bf",
                                                                                                                        "token": "string",
                                                                                                                        "value": ",",
                                                                                                                        "children": []
                                                                                                                    }
                                                                                                                ],
                                                                                                                "ui": {
                                                                                                                    "callMode": "generic"
                                                                                                                }
                                                                                                            },
                                                                                                            {
                                                                                                                "id": "e3ff887b-24eb-4f17-936f-c00691cf57ce",
                                                                                                                "token": "if",
                                                                                                                "value": null,
                                                                                                                "children": [
                                                                                                                    {
                                                                                                                        "id": "fee3f5af-0ea0-43f8-bfe2-aafbdfdb3f53",
                                                                                                                        "token": "call",
                                                                                                                        "value": null,
                                                                                                                        "children": [
                                                                                                                            {
                                                                                                                                "id": "b5a92269-75c3-44ae-a914-4249fa18be61",
                                                                                                                                "token": "variable",
                                                                                                                                "value": "<",
                                                                                                                                "children": []
                                                                                                                            },
                                                                                                                            {
                                                                                                                                "id": "8a19b194-70cd-44ce-9f9c-1009929988b3",
                                                                                                                                "token": "variable",
                                                                                                                                "value": "inp_ptr",
                                                                                                                                "children": []
                                                                                                                            },
                                                                                                                            {
                                                                                                                                "id": "4d0f33a2-ce98-435e-8c4f-5e0b6f4dba1a",
                                                                                                                                "token": "call",
                                                                                                                                "value": null,
                                                                                                                                "children": [
                                                                                                                                    {
                                                                                                                                        "id": "b5205bff-bc04-49e5-93f6-b7f2a1c86cac",
                                                                                                                                        "token": "variable",
                                                                                                                                        "value": "len",
                                                                                                                                        "children": []
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        "id": "43685900-e63f-4b82-808f-232c42e5fe77",
                                                                                                                                        "token": "variable",
                                                                                                                                        "value": "input",
                                                                                                                                        "children": []
                                                                                                                                    }
                                                                                                                                ],
                                                                                                                                "ui": {
                                                                                                                                    "callMode": "fixed",
                                                                                                                                    "callOperation": "len"
                                                                                                                                }
                                                                                                                            }
                                                                                                                        ],
                                                                                                                        "ui": {
                                                                                                                            "callMode": "fixed",
                                                                                                                            "callOperation": "<"
                                                                                                                        }
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "id": "73bed836-b329-475e-8708-b95cf76d44bc",
                                                                                                                        "token": "block",
                                                                                                                        "value": null,
                                                                                                                        "children": [
                                                                                                                            {
                                                                                                                                "id": "f54650f6-6547-4d17-951c-62edd96abd5d",
                                                                                                                                "token": "call",
                                                                                                                                "value": null,
                                                                                                                                "children": [
                                                                                                                                    {
                                                                                                                                        "id": "f8b55422-6167-42d5-ba20-6b64a0c5dc71",
                                                                                                                                        "token": "variable",
                                                                                                                                        "value": "set_at",
                                                                                                                                        "children": []
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        "id": "08997088-6003-42a6-8ad0-1ce78c2222be",
                                                                                                                                        "token": "variable",
                                                                                                                                        "value": "tape",
                                                                                                                                        "children": []
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        "id": "cb6cc2c7-2f67-41cf-b6de-e81a45434e12",
                                                                                                                                        "token": "call",
                                                                                                                                        "value": null,
                                                                                                                                        "children": [
                                                                                                                                            {
                                                                                                                                                "id": "7846b20f-10ba-4419-ba2e-6041859954b8",
                                                                                                                                                "token": "variable",
                                                                                                                                                "value": "at",
                                                                                                                                                "children": []
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                "id": "a5f95b5e-2e56-4c4c-b1dd-a31e5469800e",
                                                                                                                                                "token": "variable",
                                                                                                                                                "value": "input",
                                                                                                                                                "children": []
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                "id": "7755f2a3-d042-4724-9dec-ff03d7d6fb0f",
                                                                                                                                                "token": "variable",
                                                                                                                                                "value": "inp_ptr",
                                                                                                                                                "children": []
                                                                                                                                            }
                                                                                                                                        ],
                                                                                                                                        "ui": {
                                                                                                                                            "callMode": "fixed",
                                                                                                                                            "callOperation": "at"
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        "id": "b06e17c1-48ae-4a67-a8dc-88cbf35b9685",
                                                                                                                                        "token": "variable",
                                                                                                                                        "value": "ptr",
                                                                                                                                        "children": []
                                                                                                                                    }
                                                                                                                                ],
                                                                                                                                "ui": {
                                                                                                                                    "callMode": "fixed",
                                                                                                                                    "callOperation": "set_at"
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                "id": "0c731fa8-4cd3-41bf-af0e-7a019bfaf680",
                                                                                                                                "token": "assign",
                                                                                                                                "value": null,
                                                                                                                                "children": [
                                                                                                                                    {
                                                                                                                                        "id": "8b240149-b416-40b7-a35c-02b731f37c3c",
                                                                                                                                        "token": "variable",
                                                                                                                                        "value": "inp_ptr",
                                                                                                                                        "children": []
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        "id": "1a7ce174-ebc9-43da-95a1-651dddcc970f",
                                                                                                                                        "token": "call",
                                                                                                                                        "value": null,
                                                                                                                                        "children": [
                                                                                                                                            {
                                                                                                                                                "id": "6f847e5d-d9f8-47a4-9e6d-4cde69a4e3c4",
                                                                                                                                                "token": "variable",
                                                                                                                                                "value": "+",
                                                                                                                                                "children": []
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                "id": "dff24f0e-8085-4dfd-968b-c62a551f6430",
                                                                                                                                                "token": "variable",
                                                                                                                                                "value": "inp_ptr",
                                                                                                                                                "children": []
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                "id": "13e8db6d-b957-4339-836d-c719d20355eb",
                                                                                                                                                "token": "number",
                                                                                                                                                "value": 1,
                                                                                                                                                "children": []
                                                                                                                                            }
                                                                                                                                        ],
                                                                                                                                        "ui": {
                                                                                                                                            "callMode": "fixed",
                                                                                                                                            "callOperation": "+"
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                ]
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "id": "1d6fb81d-12f5-4168-9b21-e3f82a5b68fd",
                                                                                                                        "token": "block",
                                                                                                                        "value": null,
                                                                                                                        "children": [
                                                                                                                            {
                                                                                                                                "id": "f84b1b61-de60-46a3-aee4-c3ad69c62ede",
                                                                                                                                "token": "call",
                                                                                                                                "value": null,
                                                                                                                                "children": [
                                                                                                                                    {
                                                                                                                                        "id": "bd22c649-ea6f-4ce1-aa80-ef1793a23fc9",
                                                                                                                                        "token": "variable",
                                                                                                                                        "value": "set_at",
                                                                                                                                        "children": []
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        "id": "20ee752a-3e29-4274-966a-3aa078b87370",
                                                                                                                                        "token": "variable",
                                                                                                                                        "value": "tape",
                                                                                                                                        "children": []
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        "id": "cb25c9a9-f89b-48df-825c-c149cd7558af",
                                                                                                                                        "token": "number",
                                                                                                                                        "value": 0,
                                                                                                                                        "children": []
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        "id": "9feed656-3a89-4530-8161-294d6c556112",
                                                                                                                                        "token": "variable",
                                                                                                                                        "value": "ptr",
                                                                                                                                        "children": []
                                                                                                                                    }
                                                                                                                                ],
                                                                                                                                "ui": {
                                                                                                                                    "callMode": "fixed",
                                                                                                                                    "callOperation": "set_at"
                                                                                                                                }
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    }
                                                                                                                ]
                                                                                                            },
                                                                                                            {
                                                                                                                "id": "1e62c761-48a5-4c0b-af8a-b08975d25605",
                                                                                                                "token": "if",
                                                                                                                "value": null,
                                                                                                                "children": [
                                                                                                                    {
                                                                                                                        "id": "8e85e034-b4b4-4bb1-a72a-80194bcb7db5",
                                                                                                                        "token": "call",
                                                                                                                        "value": null,
                                                                                                                        "children": [
                                                                                                                            {
                                                                                                                                "id": "71c3bed5-a3fb-4a82-ab34-74c681e2b632",
                                                                                                                                "token": "variable",
                                                                                                                                "value": "is_cmd",
                                                                                                                                "children": []
                                                                                                                            },
                                                                                                                            {
                                                                                                                                "id": "00a2a072-a6cb-4f08-9145-57f5c277d700",
                                                                                                                                "token": "variable",
                                                                                                                                "value": "cmd",
                                                                                                                                "children": []
                                                                                                                            },
                                                                                                                            {
                                                                                                                                "id": "6ee9184d-85e4-4e7b-adaf-90a9d1f0621b",
                                                                                                                                "token": "string",
                                                                                                                                "value": "[",
                                                                                                                                "children": []
                                                                                                                            }
                                                                                                                        ],
                                                                                                                        "ui": {
                                                                                                                            "callMode": "generic"
                                                                                                                        }
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "id": "0152fae0-695c-4ed8-b945-f2c4a43f13a4",
                                                                                                                        "token": "if",
                                                                                                                        "value": null,
                                                                                                                        "children": [
                                                                                                                            {
                                                                                                                                "id": "35f12eeb-f66d-4e27-9e54-587cae505f08",
                                                                                                                                "token": "call",
                                                                                                                                "value": null,
                                                                                                                                "children": [
                                                                                                                                    {
                                                                                                                                        "id": "fdefd850-96d6-4774-a55f-288197784c39",
                                                                                                                                        "token": "variable",
                                                                                                                                        "value": "==",
                                                                                                                                        "children": []
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        "id": "a83033fa-c505-4ac2-9ed6-d6ad44e6a5f2",
                                                                                                                                        "token": "call",
                                                                                                                                        "value": null,
                                                                                                                                        "children": [
                                                                                                                                            {
                                                                                                                                                "id": "e564a4d2-c125-4c6c-933b-05c16f366b24",
                                                                                                                                                "token": "variable",
                                                                                                                                                "value": "at",
                                                                                                                                                "children": []
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                "id": "d427faf4-fa0a-495c-83f8-531dd627f1ea",
                                                                                                                                                "token": "variable",
                                                                                                                                                "value": "tape",
                                                                                                                                                "children": []
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                "id": "a479cd43-8795-4066-aee2-70fc50313524",
                                                                                                                                                "token": "variable",
                                                                                                                                                "value": "ptr",
                                                                                                                                                "children": []
                                                                                                                                            }
                                                                                                                                        ],
                                                                                                                                        "ui": {
                                                                                                                                            "callMode": "fixed",
                                                                                                                                            "callOperation": "at"
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        "id": "b1f3ce79-8d02-4c86-84c8-8832a4c36829",
                                                                                                                                        "token": "number",
                                                                                                                                        "value": 0,
                                                                                                                                        "children": []
                                                                                                                                    }
                                                                                                                                ],
                                                                                                                                "ui": {
                                                                                                                                    "callMode": "fixed",
                                                                                                                                    "callOperation": "=="
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                "id": "f46b9c5f-0ff6-472d-897f-94246390656e",
                                                                                                                                "token": "block",
                                                                                                                                "value": null,
                                                                                                                                "children": [
                                                                                                                                    {
                                                                                                                                        "id": "7913287e-3896-4bcd-b066-14dd3ca069cf",
                                                                                                                                        "token": "assign",
                                                                                                                                        "value": null,
                                                                                                                                        "children": [
                                                                                                                                            {
                                                                                                                                                "id": "7226dc89-7073-4403-85b3-cf23e43459b7",
                                                                                                                                                "token": "variable",
                                                                                                                                                "value": "depth",
                                                                                                                                                "children": []
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                "id": "ab96cee3-f83a-4a76-8370-ef07dc7c5d4a",
                                                                                                                                                "token": "number",
                                                                                                                                                "value": 1,
                                                                                                                                                "children": []
                                                                                                                                            }
                                                                                                                                        ]
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        "id": "08d96811-647e-4c6e-a36b-3066d726053a",
                                                                                                                                        "token": "while",
                                                                                                                                        "value": null,
                                                                                                                                        "children": [
                                                                                                                                            {
                                                                                                                                                "id": "fd356dcb-814d-4c1c-8098-ba028518c775",
                                                                                                                                                "token": "call",
                                                                                                                                                "value": null,
                                                                                                                                                "children": [
                                                                                                                                                    {
                                                                                                                                                        "id": "b3b0148a-c43f-4586-b361-5a17609fd323",
                                                                                                                                                        "token": "variable",
                                                                                                                                                        "value": ">",
                                                                                                                                                        "children": []
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        "id": "757ad227-7a52-4b1a-9e1c-ed6d12fd3125",
                                                                                                                                                        "token": "variable",
                                                                                                                                                        "value": "depth",
                                                                                                                                                        "children": []
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        "id": "4a2736de-d093-4ed0-8840-c83d2f091bb8",
                                                                                                                                                        "token": "number",
                                                                                                                                                        "value": 0,
                                                                                                                                                        "children": []
                                                                                                                                                    }
                                                                                                                                                ],
                                                                                                                                                "ui": {
                                                                                                                                                    "callMode": "fixed",
                                                                                                                                                    "callOperation": ">"
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                "id": "a6778f9c-b4bf-439b-aa4b-57f460cab45b",
                                                                                                                                                "token": "block",
                                                                                                                                                "value": null,
                                                                                                                                                "children": [
                                                                                                                                                    {
                                                                                                                                                        "id": "b6c17c1a-c00a-4197-b642-385cdb3f1a99",
                                                                                                                                                        "token": "assign",
                                                                                                                                                        "value": null,
                                                                                                                                                        "children": [
                                                                                                                                                            {
                                                                                                                                                                "id": "cb87b4f0-910f-4b2b-ba9a-dcc6999793a5",
                                                                                                                                                                "token": "variable",
                                                                                                                                                                "value": "ip",
                                                                                                                                                                "children": []
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                "id": "899d5522-a46f-4a53-a75d-2818c8c031b8",
                                                                                                                                                                "token": "call",
                                                                                                                                                                "value": null,
                                                                                                                                                                "children": [
                                                                                                                                                                    {
                                                                                                                                                                        "id": "eef02973-3975-4474-962d-379ceb2d9013",
                                                                                                                                                                        "token": "variable",
                                                                                                                                                                        "value": "+",
                                                                                                                                                                        "children": []
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        "id": "c08e43d8-7dde-4d84-8205-c989c7c61d16",
                                                                                                                                                                        "token": "variable",
                                                                                                                                                                        "value": "ip",
                                                                                                                                                                        "children": []
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        "id": "49edf8ae-e4c5-4b19-ae90-dcb93bfd8547",
                                                                                                                                                                        "token": "number",
                                                                                                                                                                        "value": 1,
                                                                                                                                                                        "children": []
                                                                                                                                                                    }
                                                                                                                                                                ],
                                                                                                                                                                "ui": {
                                                                                                                                                                    "callMode": "fixed",
                                                                                                                                                                    "callOperation": "+"
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                        ]
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        "id": "2ce0f942-cec8-4301-8ccc-2047df817f84",
                                                                                                                                                        "token": "assign",
                                                                                                                                                        "value": null,
                                                                                                                                                        "children": [
                                                                                                                                                            {
                                                                                                                                                                "id": "c1234c6d-4eba-48a3-96d6-5a0eef50be76",
                                                                                                                                                                "token": "variable",
                                                                                                                                                                "value": "jcmd",
                                                                                                                                                                "children": []
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                "id": "c6952d81-fa67-429b-b7ab-19be23d1e2ea",
                                                                                                                                                                "token": "call",
                                                                                                                                                                "value": null,
                                                                                                                                                                "children": [
                                                                                                                                                                    {
                                                                                                                                                                        "id": "3489722c-0af8-4649-a3ff-be7681c78fde",
                                                                                                                                                                        "token": "variable",
                                                                                                                                                                        "value": "charAt",
                                                                                                                                                                        "children": []
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        "id": "0b504993-9931-4738-a766-cd4e744a200a",
                                                                                                                                                                        "token": "variable",
                                                                                                                                                                        "value": "code",
                                                                                                                                                                        "children": []
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        "id": "749ddbe8-3387-4fa7-8148-5fb3eb43b79c",
                                                                                                                                                                        "token": "variable",
                                                                                                                                                                        "value": "ip",
                                                                                                                                                                        "children": []
                                                                                                                                                                    }
                                                                                                                                                                ],
                                                                                                                                                                "ui": {
                                                                                                                                                                    "callMode": "fixed",
                                                                                                                                                                    "callOperation": "charAt"
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                        ]
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        "id": "fca18fe7-551b-47af-abc2-73bc1de4e2d5",
                                                                                                                                                        "token": "if",
                                                                                                                                                        "value": null,
                                                                                                                                                        "children": [
                                                                                                                                                            {
                                                                                                                                                                "id": "e15c8402-a73a-4282-9a59-fb36602ecc1f",
                                                                                                                                                                "token": "call",
                                                                                                                                                                "value": null,
                                                                                                                                                                "children": [
                                                                                                                                                                    {
                                                                                                                                                                        "id": "5e71fb5b-7dd3-4dd7-b25a-31115b48397d",
                                                                                                                                                                        "token": "variable",
                                                                                                                                                                        "value": "is_cmd",
                                                                                                                                                                        "children": []
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        "id": "c846e130-ebda-4cf4-a004-2a51af24b4c9",
                                                                                                                                                                        "token": "variable",
                                                                                                                                                                        "value": "jcmd",
                                                                                                                                                                        "children": []
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        "id": "8a26395b-2a63-4552-a0b5-363b2dfb8a7b",
                                                                                                                                                                        "token": "string",
                                                                                                                                                                        "value": "[",
                                                                                                                                                                        "children": []
                                                                                                                                                                    }
                                                                                                                                                                ],
                                                                                                                                                                "ui": {
                                                                                                                                                                    "callMode": "generic"
                                                                                                                                                                }
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                "id": "56574c3b-29f5-4dec-b9b5-842f9f66c5bf",
                                                                                                                                                                "token": "assign",
                                                                                                                                                                "value": null,
                                                                                                                                                                "children": [
                                                                                                                                                                    {
                                                                                                                                                                        "id": "068b4bf0-bbdc-46d0-bf4f-e0926d7ac868",
                                                                                                                                                                        "token": "variable",
                                                                                                                                                                        "value": "depth",
                                                                                                                                                                        "children": []
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        "id": "ccc65d29-b6ce-4256-8dbb-1c59f076a080",
                                                                                                                                                                        "token": "call",
                                                                                                                                                                        "value": null,
                                                                                                                                                                        "children": [
                                                                                                                                                                            {
                                                                                                                                                                                "id": "9db08738-1bac-42db-a4bc-8ee3a813eeb6",
                                                                                                                                                                                "token": "variable",
                                                                                                                                                                                "value": "+",
                                                                                                                                                                                "children": []
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                                "id": "31839841-f8b9-48d8-a15b-4ccd18539175",
                                                                                                                                                                                "token": "variable",
                                                                                                                                                                                "value": "depth",
                                                                                                                                                                                "children": []
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                                "id": "cbfe4b62-005b-42df-bce1-78a00aa51baa",
                                                                                                                                                                                "token": "number",
                                                                                                                                                                                "value": 1,
                                                                                                                                                                                "children": []
                                                                                                                                                                            }
                                                                                                                                                                        ],
                                                                                                                                                                        "ui": {
                                                                                                                                                                            "callMode": "fixed",
                                                                                                                                                                            "callOperation": "+"
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                ]
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                "id": "36f7f390-e2ff-478c-96e0-4afc8a777bd7",
                                                                                                                                                                "token": "if",
                                                                                                                                                                "value": null,
                                                                                                                                                                "children": [
                                                                                                                                                                    {
                                                                                                                                                                        "id": "ceb0ed44-0909-4879-bf96-081f5443a890",
                                                                                                                                                                        "token": "call",
                                                                                                                                                                        "value": null,
                                                                                                                                                                        "children": [
                                                                                                                                                                            {
                                                                                                                                                                                "id": "a45165dd-eac6-4645-ab87-bb090290ae5c",
                                                                                                                                                                                "token": "variable",
                                                                                                                                                                                "value": "is_cmd",
                                                                                                                                                                                "children": []
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                                "id": "8ad41bb6-8f75-427c-9fa6-28da3d856a00",
                                                                                                                                                                                "token": "variable",
                                                                                                                                                                                "value": "jcmd",
                                                                                                                                                                                "children": []
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                                "id": "0c5e1471-3922-4e30-a7b7-b690776b0a97",
                                                                                                                                                                                "token": "string",
                                                                                                                                                                                "value": "]",
                                                                                                                                                                                "children": []
                                                                                                                                                                            }
                                                                                                                                                                        ],
                                                                                                                                                                        "ui": {
                                                                                                                                                                            "callMode": "generic"
                                                                                                                                                                        }
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        "id": "13de8256-cd0e-4b50-97b6-1102462f86ff",
                                                                                                                                                                        "token": "assign",
                                                                                                                                                                        "value": null,
                                                                                                                                                                        "children": [
                                                                                                                                                                            {
                                                                                                                                                                                "id": "9c4cfae5-4139-4c3e-b794-c2a5b76a2286",
                                                                                                                                                                                "token": "variable",
                                                                                                                                                                                "value": "depth",
                                                                                                                                                                                "children": []
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                                "id": "9ac9ed30-6589-45f4-b0a2-de1b8268ded7",
                                                                                                                                                                                "token": "call",
                                                                                                                                                                                "value": null,
                                                                                                                                                                                "children": [
                                                                                                                                                                                    {
                                                                                                                                                                                        "id": "3e77c279-110b-4988-9adc-752a0ea89dd0",
                                                                                                                                                                                        "token": "variable",
                                                                                                                                                                                        "value": "-",
                                                                                                                                                                                        "children": []
                                                                                                                                                                                    },
                                                                                                                                                                                    {
                                                                                                                                                                                        "id": "8ce3e0c3-9b66-49f5-a6de-628096a87f78",
                                                                                                                                                                                        "token": "variable",
                                                                                                                                                                                        "value": "depth",
                                                                                                                                                                                        "children": []
                                                                                                                                                                                    },
                                                                                                                                                                                    {
                                                                                                                                                                                        "id": "251f354c-0b5b-43a1-9063-86b1501fa4ba",
                                                                                                                                                                                        "token": "number",
                                                                                                                                                                                        "value": 1,
                                                                                                                                                                                        "children": []
                                                                                                                                                                                    }
                                                                                                                                                                                ],
                                                                                                                                                                                "ui": {
                                                                                                                                                                                    "callMode": "fixed",
                                                                                                                                                                                    "callOperation": "-"
                                                                                                                                                                                }
                                                                                                                                                                            }
                                                                                                                                                                        ]
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        "id": "65cf9711-0820-4f08-a92f-b106ca19ba5d",
                                                                                                                                                                        "token": "block",
                                                                                                                                                                        "value": null,
                                                                                                                                                                        "children": []
                                                                                                                                                                    }
                                                                                                                                                                ]
                                                                                                                                                            }
                                                                                                                                                        ]
                                                                                                                                                    }
                                                                                                                                                ]
                                                                                                                                            }
                                                                                                                                        ]
                                                                                                                                    }
                                                                                                                                ]
                                                                                                                            },
                                                                                                                            {
                                                                                                                                "id": "afe4a596-7294-45de-bd43-fe982a3551cf",
                                                                                                                                "token": "block",
                                                                                                                                "value": null,
                                                                                                                                "children": []
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "id": "df310197-45e5-43b2-9fbf-d8073cddce8b",
                                                                                                                        "token": "if",
                                                                                                                        "value": null,
                                                                                                                        "children": [
                                                                                                                            {
                                                                                                                                "id": "89a75d62-1d97-4b74-a4c3-824ebc84ca89",
                                                                                                                                "token": "call",
                                                                                                                                "value": null,
                                                                                                                                "children": [
                                                                                                                                    {
                                                                                                                                        "id": "e4a1c555-db9c-4fbe-b93c-c878bc510245",
                                                                                                                                        "token": "variable",
                                                                                                                                        "value": "is_cmd",
                                                                                                                                        "children": []
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        "id": "4cf23fc5-16d3-4f9e-82cc-1edda769579a",
                                                                                                                                        "token": "variable",
                                                                                                                                        "value": "cmd",
                                                                                                                                        "children": []
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        "id": "65b376a2-a7e9-4cbd-b08d-bbf86d62293d",
                                                                                                                                        "token": "string",
                                                                                                                                        "value": "]",
                                                                                                                                        "children": []
                                                                                                                                    }
                                                                                                                                ],
                                                                                                                                "ui": {
                                                                                                                                    "callMode": "generic"
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                "id": "b4011c7c-0dae-42fd-8b68-60f94f7a1462",
                                                                                                                                "token": "if",
                                                                                                                                "value": null,
                                                                                                                                "children": [
                                                                                                                                    {
                                                                                                                                        "id": "86329fc8-143d-453c-8e8b-db96e3b58f3f",
                                                                                                                                        "token": "call",
                                                                                                                                        "value": null,
                                                                                                                                        "children": [
                                                                                                                                            {
                                                                                                                                                "id": "26d04bf6-036a-4cb2-962b-f4f0b5531775",
                                                                                                                                                "token": "variable",
                                                                                                                                                "value": "!=",
                                                                                                                                                "children": []
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                "id": "6fe164d5-6c6f-4615-b393-2590263476b2",
                                                                                                                                                "token": "call",
                                                                                                                                                "value": null,
                                                                                                                                                "children": [
                                                                                                                                                    {
                                                                                                                                                        "id": "0ba69edd-efc5-4323-991c-e08c006546ce",
                                                                                                                                                        "token": "variable",
                                                                                                                                                        "value": "at",
                                                                                                                                                        "children": []
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        "id": "6c0e8106-a752-4193-96d4-e9875415b6a6",
                                                                                                                                                        "token": "variable",
                                                                                                                                                        "value": "tape",
                                                                                                                                                        "children": []
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        "id": "d11b3036-1833-4d0c-a4a6-c148e9ec35b3",
                                                                                                                                                        "token": "variable",
                                                                                                                                                        "value": "ptr",
                                                                                                                                                        "children": []
                                                                                                                                                    }
                                                                                                                                                ],
                                                                                                                                                "ui": {
                                                                                                                                                    "callMode": "fixed",
                                                                                                                                                    "callOperation": "at"
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                "id": "c7152dac-b053-4334-a120-e983f0be3377",
                                                                                                                                                "token": "number",
                                                                                                                                                "value": 0,
                                                                                                                                                "children": []
                                                                                                                                            }
                                                                                                                                        ],
                                                                                                                                        "ui": {
                                                                                                                                            "callMode": "fixed",
                                                                                                                                            "callOperation": "!="
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        "id": "2dff6b90-ddcf-4a71-9892-8cd4419f81f2",
                                                                                                                                        "token": "block",
                                                                                                                                        "value": null,
                                                                                                                                        "children": [
                                                                                                                                            {
                                                                                                                                                "id": "117c03a4-1fb9-469d-9913-1069b529b5de",
                                                                                                                                                "token": "assign",
                                                                                                                                                "value": null,
                                                                                                                                                "children": [
                                                                                                                                                    {
                                                                                                                                                        "id": "2abe6bec-a2e0-4268-84b2-df8a991c9eb8",
                                                                                                                                                        "token": "variable",
                                                                                                                                                        "value": "depth",
                                                                                                                                                        "children": []
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        "id": "dda8efa0-9934-48f4-ac22-6d33e0c09fbb",
                                                                                                                                                        "token": "number",
                                                                                                                                                        "value": 1,
                                                                                                                                                        "children": []
                                                                                                                                                    }
                                                                                                                                                ]
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                "id": "f4dea886-c82d-4cc1-aaea-3e0cb49ea423",
                                                                                                                                                "token": "while",
                                                                                                                                                "value": null,
                                                                                                                                                "children": [
                                                                                                                                                    {
                                                                                                                                                        "id": "fb6539bd-a695-4ffd-ae30-8ce8090c7b6a",
                                                                                                                                                        "token": "call",
                                                                                                                                                        "value": null,
                                                                                                                                                        "children": [
                                                                                                                                                            {
                                                                                                                                                                "id": "4a4bd504-2d3b-451e-af57-071bd60d4b81",
                                                                                                                                                                "token": "variable",
                                                                                                                                                                "value": ">",
                                                                                                                                                                "children": []
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                "id": "bba3586c-02fa-41a8-91ae-08bb83452322",
                                                                                                                                                                "token": "variable",
                                                                                                                                                                "value": "depth",
                                                                                                                                                                "children": []
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                "id": "537690a5-009d-4d24-ab1c-756a9c225f4b",
                                                                                                                                                                "token": "number",
                                                                                                                                                                "value": 0,
                                                                                                                                                                "children": []
                                                                                                                                                            }
                                                                                                                                                        ],
                                                                                                                                                        "ui": {
                                                                                                                                                            "callMode": "fixed",
                                                                                                                                                            "callOperation": ">"
                                                                                                                                                        }
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        "id": "0d77ac1e-3a60-4382-a086-56b51053bd51",
                                                                                                                                                        "token": "block",
                                                                                                                                                        "value": null,
                                                                                                                                                        "children": [
                                                                                                                                                            {
                                                                                                                                                                "id": "c25b128f-fd84-495b-879c-aaf088fd158b",
                                                                                                                                                                "token": "assign",
                                                                                                                                                                "value": null,
                                                                                                                                                                "children": [
                                                                                                                                                                    {
                                                                                                                                                                        "id": "818e1b6a-d05f-4010-90fb-d44ed5da59bd",
                                                                                                                                                                        "token": "variable",
                                                                                                                                                                        "value": "ip",
                                                                                                                                                                        "children": []
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        "id": "3f996535-fdc8-445c-b509-fceab9f3b90f",
                                                                                                                                                                        "token": "call",
                                                                                                                                                                        "value": null,
                                                                                                                                                                        "children": [
                                                                                                                                                                            {
                                                                                                                                                                                "id": "61163c23-d575-4527-8978-088754f74a2b",
                                                                                                                                                                                "token": "variable",
                                                                                                                                                                                "value": "-",
                                                                                                                                                                                "children": []
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                                "id": "de072aa6-ba29-43e4-990e-f30fb6b85714",
                                                                                                                                                                                "token": "variable",
                                                                                                                                                                                "value": "ip",
                                                                                                                                                                                "children": []
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                                "id": "522c358f-a2a4-4820-94a6-e781a410b91a",
                                                                                                                                                                                "token": "number",
                                                                                                                                                                                "value": 1,
                                                                                                                                                                                "children": []
                                                                                                                                                                            }
                                                                                                                                                                        ],
                                                                                                                                                                        "ui": {
                                                                                                                                                                            "callMode": "fixed",
                                                                                                                                                                            "callOperation": "-"
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                ]
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                "id": "88e60376-8d38-498d-afff-020af0c87b38",
                                                                                                                                                                "token": "assign",
                                                                                                                                                                "value": null,
                                                                                                                                                                "children": [
                                                                                                                                                                    {
                                                                                                                                                                        "id": "e9fc15db-32f6-474f-a882-db7b2262365e",
                                                                                                                                                                        "token": "variable",
                                                                                                                                                                        "value": "jcmd",
                                                                                                                                                                        "children": []
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        "id": "1c10abc9-c620-4b69-8def-e5f1cfe9a098",
                                                                                                                                                                        "token": "call",
                                                                                                                                                                        "value": null,
                                                                                                                                                                        "children": [
                                                                                                                                                                            {
                                                                                                                                                                                "id": "5a2d41fe-00bd-451d-823f-8a8ddfa7ee47",
                                                                                                                                                                                "token": "variable",
                                                                                                                                                                                "value": "charAt",
                                                                                                                                                                                "children": []
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                                "id": "78f23717-dde5-445a-9c7d-091c2ee6960c",
                                                                                                                                                                                "token": "variable",
                                                                                                                                                                                "value": "code",
                                                                                                                                                                                "children": []
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                                "id": "8464c149-5f5e-4cf7-b6d8-7c9040bfae04",
                                                                                                                                                                                "token": "variable",
                                                                                                                                                                                "value": "ip",
                                                                                                                                                                                "children": []
                                                                                                                                                                            }
                                                                                                                                                                        ],
                                                                                                                                                                        "ui": {
                                                                                                                                                                            "callMode": "fixed",
                                                                                                                                                                            "callOperation": "charAt"
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                ]
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                "id": "28c8bd90-9150-4ab2-9dae-dbdbabe0c3ee",
                                                                                                                                                                "token": "if",
                                                                                                                                                                "value": null,
                                                                                                                                                                "children": [
                                                                                                                                                                    {
                                                                                                                                                                        "id": "d40bda4e-6c60-47ed-93af-3ed15af30e48",
                                                                                                                                                                        "token": "call",
                                                                                                                                                                        "value": null,
                                                                                                                                                                        "children": [
                                                                                                                                                                            {
                                                                                                                                                                                "id": "f58f9051-89f6-4a6e-a487-4b4318a15c19",
                                                                                                                                                                                "token": "variable",
                                                                                                                                                                                "value": "is_cmd",
                                                                                                                                                                                "children": []
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                                "id": "cf373abf-91e6-4145-8b39-7c53d9c2b697",
                                                                                                                                                                                "token": "variable",
                                                                                                                                                                                "value": "jcmd",
                                                                                                                                                                                "children": []
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                                "id": "30f58761-2297-4670-98d6-00670a8fdadc",
                                                                                                                                                                                "token": "string",
                                                                                                                                                                                "value": "]",
                                                                                                                                                                                "children": []
                                                                                                                                                                            }
                                                                                                                                                                        ],
                                                                                                                                                                        "ui": {
                                                                                                                                                                            "callMode": "generic"
                                                                                                                                                                        }
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        "id": "49b34ad7-870a-4369-83d4-82823fb1843b",
                                                                                                                                                                        "token": "assign",
                                                                                                                                                                        "value": null,
                                                                                                                                                                        "children": [
                                                                                                                                                                            {
                                                                                                                                                                                "id": "05d438ba-1bec-4b7f-9551-7d875d344c81",
                                                                                                                                                                                "token": "variable",
                                                                                                                                                                                "value": "depth",
                                                                                                                                                                                "children": []
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                                "id": "05c03583-bd2d-4ca5-8046-735b8e00399b",
                                                                                                                                                                                "token": "call",
                                                                                                                                                                                "value": null,
                                                                                                                                                                                "children": [
                                                                                                                                                                                    {
                                                                                                                                                                                        "id": "72154400-856f-4d4b-ad26-68051cad6cca",
                                                                                                                                                                                        "token": "variable",
                                                                                                                                                                                        "value": "+",
                                                                                                                                                                                        "children": []
                                                                                                                                                                                    },
                                                                                                                                                                                    {
                                                                                                                                                                                        "id": "fc8fb0dd-143e-469f-a668-55d07de107b7",
                                                                                                                                                                                        "token": "variable",
                                                                                                                                                                                        "value": "depth",
                                                                                                                                                                                        "children": []
                                                                                                                                                                                    },
                                                                                                                                                                                    {
                                                                                                                                                                                        "id": "12662386-96c0-4d2f-b8af-c89256398535",
                                                                                                                                                                                        "token": "number",
                                                                                                                                                                                        "value": 1,
                                                                                                                                                                                        "children": []
                                                                                                                                                                                    }
                                                                                                                                                                                ],
                                                                                                                                                                                "ui": {
                                                                                                                                                                                    "callMode": "fixed",
                                                                                                                                                                                    "callOperation": "+"
                                                                                                                                                                                }
                                                                                                                                                                            }
                                                                                                                                                                        ]
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        "id": "b3dfef3c-1449-4682-92b8-ba13f8b1ef80",
                                                                                                                                                                        "token": "if",
                                                                                                                                                                        "value": null,
                                                                                                                                                                        "children": [
                                                                                                                                                                            {
                                                                                                                                                                                "id": "07d3ef97-dd48-4153-b4db-1642ffa8a0d4",
                                                                                                                                                                                "token": "call",
                                                                                                                                                                                "value": null,
                                                                                                                                                                                "children": [
                                                                                                                                                                                    {
                                                                                                                                                                                        "id": "924e07cf-4abf-4879-b74a-e2a42dd76385",
                                                                                                                                                                                        "token": "variable",
                                                                                                                                                                                        "value": "is_cmd",
                                                                                                                                                                                        "children": []
                                                                                                                                                                                    },
                                                                                                                                                                                    {
                                                                                                                                                                                        "id": "070b2981-930c-4939-80a0-03035f821068",
                                                                                                                                                                                        "token": "variable",
                                                                                                                                                                                        "value": "jcmd",
                                                                                                                                                                                        "children": []
                                                                                                                                                                                    },
                                                                                                                                                                                    {
                                                                                                                                                                                        "id": "984d53ae-b867-48a0-8258-9d78c37ba560",
                                                                                                                                                                                        "token": "string",
                                                                                                                                                                                        "value": "[",
                                                                                                                                                                                        "children": []
                                                                                                                                                                                    }
                                                                                                                                                                                ],
                                                                                                                                                                                "ui": {
                                                                                                                                                                                    "callMode": "generic"
                                                                                                                                                                                }
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                                "id": "43636460-464e-4181-9dd1-b8dbaa2798f6",
                                                                                                                                                                                "token": "assign",
                                                                                                                                                                                "value": null,
                                                                                                                                                                                "children": [
                                                                                                                                                                                    {
                                                                                                                                                                                        "id": "62174e7c-8f8b-46ef-898d-91db3736d2c4",
                                                                                                                                                                                        "token": "variable",
                                                                                                                                                                                        "value": "depth",
                                                                                                                                                                                        "children": []
                                                                                                                                                                                    },
                                                                                                                                                                                    {
                                                                                                                                                                                        "id": "5b8517ea-ea5e-465c-ab0e-8392b466bc61",
                                                                                                                                                                                        "token": "call",
                                                                                                                                                                                        "value": null,
                                                                                                                                                                                        "children": [
                                                                                                                                                                                            {
                                                                                                                                                                                                "id": "7b4ce2a9-c346-4d4b-b107-e1c5f104a83a",
                                                                                                                                                                                                "token": "variable",
                                                                                                                                                                                                "value": "-",
                                                                                                                                                                                                "children": []
                                                                                                                                                                                            },
                                                                                                                                                                                            {
                                                                                                                                                                                                "id": "3fd94ee5-f34f-4de7-abfc-efd8837273a0",
                                                                                                                                                                                                "token": "variable",
                                                                                                                                                                                                "value": "depth",
                                                                                                                                                                                                "children": []
                                                                                                                                                                                            },
                                                                                                                                                                                            {
                                                                                                                                                                                                "id": "8d7093eb-adf5-43a1-95fb-b987e4545fe9",
                                                                                                                                                                                                "token": "number",
                                                                                                                                                                                                "value": 1,
                                                                                                                                                                                                "children": []
                                                                                                                                                                                            }
                                                                                                                                                                                        ],
                                                                                                                                                                                        "ui": {
                                                                                                                                                                                            "callMode": "fixed",
                                                                                                                                                                                            "callOperation": "-"
                                                                                                                                                                                        }
                                                                                                                                                                                    }
                                                                                                                                                                                ]
                                                                                                                                                                            },
                                                                                                                                                                            {
                                                                                                                                                                                "id": "cdb93109-05ca-4d56-94a3-ee5c5b46bca1",
                                                                                                                                                                                "token": "block",
                                                                                                                                                                                "value": null,
                                                                                                                                                                                "children": []
                                                                                                                                                                            }
                                                                                                                                                                        ]
                                                                                                                                                                    }
                                                                                                                                                                ]
                                                                                                                                                            }
                                                                                                                                                        ]
                                                                                                                                                    }
                                                                                                                                                ]
                                                                                                                                            }
                                                                                                                                        ]
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        "id": "aa437d5f-c284-41bc-8671-820471f2e371",
                                                                                                                                        "token": "block",
                                                                                                                                        "value": null,
                                                                                                                                        "children": []
                                                                                                                                    }
                                                                                                                                ]
                                                                                                                            },
                                                                                                                            {
                                                                                                                                "id": "9909d8da-7dee-4bca-adcb-7d8d83f73914",
                                                                                                                                "token": "block",
                                                                                                                                "value": null,
                                                                                                                                "children": []
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                "id": "01068779-8bb2-41ed-90d2-597081556770",
                                                                "token": "assign",
                                                                "value": null,
                                                                "children": [
                                                                    {
                                                                        "id": "798200ea-b352-498c-913e-3f0b45bd2b5f",
                                                                        "token": "variable",
                                                                        "value": "ip",
                                                                        "children": []
                                                                    },
                                                                    {
                                                                        "id": "d683e6a9-bb0e-45ef-86ec-c646700685b3",
                                                                        "token": "call",
                                                                        "value": null,
                                                                        "children": [
                                                                            {
                                                                                "id": "51aca990-cace-4f19-ab1f-7527cbcf947e",
                                                                                "token": "variable",
                                                                                "value": "+",
                                                                                "children": []
                                                                            },
                                                                            {
                                                                                "id": "c11caa94-193d-45ac-8e66-5d537a99b6c4",
                                                                                "token": "variable",
                                                                                "value": "ip",
                                                                                "children": []
                                                                            },
                                                                            {
                                                                                "id": "1a7adbab-45a6-484b-80bb-ff157af36b7f",
                                                                                "token": "number",
                                                                                "value": 1,
                                                                                "children": []
                                                                            }
                                                                        ],
                                                                        "ui": {
                                                                            "callMode": "fixed",
                                                                            "callOperation": "+"
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "fecccc5a-c264-478b-b025-31c3c12b2848",
                                                "token": "return",
                                                "value": null,
                                                "children": [
                                                    {
                                                        "id": "85980272-b489-4243-a718-334b7eb19bb0",
                                                        "token": "variable",
                                                        "value": "output",
                                                        "children": []
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "16d315ed-1b4f-4257-a992-46aac2e63750",
                        "token": "assign",
                        "value": null,
                        "children": [
                            {
                                "id": "d1fd6e27-bd9c-4eb7-9df8-5b981d547ba5",
                                "token": "variable",
                                "value": "program",
                                "children": []
                            },
                            {
                                "id": "f3a75dac-4dfb-43b3-bdc2-20c6c8bb710d",
                                "token": "call",
                                "value": null,
                                "children": [
                                    {
                                        "id": "d4091af8-b59d-4bb9-bfca-856bd85b0d5f",
                                        "token": "variable",
                                        "value": "input",
                                        "children": []
                                    }
                                ],
                                "ui": {
                                    "callMode": "fixed",
                                    "callOperation": "input"
                                }
                            }
                        ]
                    },
                    {
                        "id": "6410543b-113c-4413-8a7e-fd30b2308533",
                        "token": "assign",
                        "value": null,
                        "children": [
                            {
                                "id": "8fad4394-c6e5-4489-bad6-45b223c5305d",
                                "token": "variable",
                                "value": "input",
                                "children": []
                            },
                            {
                                "id": "8d95cf10-bce4-4ada-b3b3-7f06f38d0fe4",
                                "token": "array",
                                "value": null,
                                "children": [
                                    {
                                        "id": "5987ec15-f574-4590-b61f-52e2f6957fc6",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "efd2150d-187c-4c3f-b8fc-673743a90242",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "d3a402c6-8bc5-4931-b184-1cc3d1a12ad4",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "0e8368e0-1d0c-450f-9685-57ad37d809c7",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "01d3f2ec-c259-4728-9f46-ecf28a5306d9",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "80ad4f9b-9e83-4969-985d-3025baff7606",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "f2d67d3d-77b7-4756-87f6-1df744f66fc5",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "cc87cb76-cc88-47fb-9382-7f8a12c6a485",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "0d6f3c18-b670-4b2b-8686-b53b82188f86",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "88656673-5bee-40a3-9a65-b7ec8a5abe6c",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "7cccb0cd-b217-4c2d-8caf-5bd1e8d3882a",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "0ee22b90-e36f-4d47-a08e-53fc72ecbb88",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "c1e240a0-a20c-407f-8948-3c7730c83578",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "37ac90c6-d202-4753-9f1a-b9420d1cb50e",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "7619cc91-2121-4e1f-a41f-d61d1d10c675",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "ecb5a37e-de5f-4996-aa62-e2699843cbe3",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "8abd599d-e914-4798-8d1f-c41734718a4a",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "e153c1e4-24bd-45f0-97d9-7b77f12da6be",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "594face7-fa85-45b5-b3c8-7228b61f8493",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "af73b0af-9694-444a-bdde-7224b7472e55",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "3f2423bf-130f-4e61-a765-b7f7a2e90792",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "81ee5db8-e025-4e44-8ce4-9e10aea66a43",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "d8ed18e6-86c4-4f2e-aa47-fd71c501abe2",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "6bf30c95-ef54-4989-a278-eca22393e600",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "be3ab525-b825-4c5a-b7d8-0540660ce71a",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "0b497d12-6b9b-4469-8ec7-3938a3e42691",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "af36c7de-e16d-4758-970c-eaa63471f674",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "468131f5-2473-4c75-b5ee-762603c5c2d1",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "f9272b42-f301-4b42-bd44-75081e288672",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "2ad20d80-2a2f-4573-aa82-cac92895eae8",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "6586bbb5-e75a-4bb4-980b-d29e71e07424",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "6f572bb1-00c9-44b1-91e7-c1604e3ee080",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "836a8067-9ab1-4fd7-bf75-b94655550391",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "cc522608-fe58-4774-9a87-4653eadfbe82",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "0d655f68-c3f0-43e6-ab5f-9559eedfdba0",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "9768bf03-93b4-4fca-998b-3e3109aa30c8",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "b226077d-5c17-48f7-9255-8a43435067e7",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "f060f69a-769e-4462-8638-c27ae8b2b92b",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "68f25bd6-7b02-4553-afa9-f3568418eb43",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "55045f81-1b5f-40cd-8ac5-0b1aa228d13b",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "66665c0e-8869-4dad-9e45-f4d10295c55e",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "b8c58511-6125-45f2-bf32-75f0ace5a02b",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "1ec391f8-90b3-47ab-a344-7ea40f0d4266",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "561216d4-f76e-45ba-8889-4d879296116d",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "63d39431-21ec-4220-84d1-ef972094dc73",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "ecee74e0-8142-43c2-a5a3-dad7ab48fffb",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "8190e193-7727-4047-910f-45b9fde566b8",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "64d14625-d93b-46fd-bf7d-6670b786c52f",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "99cc8ea0-22b7-4f50-9d5f-7608fd6414b4",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    },
                                    {
                                        "id": "5b3d4ac1-e7ad-4a43-9455-01c46ce8ef79",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "1091ab93-a61a-4448-88a9-6c90fbd14e7f",
                        "token": "assign",
                        "value": null,
                        "children": [
                            {
                                "id": "882e2ada-be12-4148-918e-2b0ae2036504",
                                "token": "variable",
                                "value": "res",
                                "children": []
                            },
                            {
                                "id": "da0354b0-a264-4f03-9876-d9eb26535a8c",
                                "token": "call",
                                "value": null,
                                "children": [
                                    {
                                        "id": "7964db78-b173-4250-86e8-da91e1b2e3ca",
                                        "token": "variable",
                                        "value": "run_bf",
                                        "children": []
                                    },
                                    {
                                        "id": "85fa5c97-c504-4605-9292-6950333d406d",
                                        "token": "variable",
                                        "value": "program",
                                        "children": []
                                    },
                                    {
                                        "id": "cc6595ac-93b1-461f-a44d-92201c9ce73b",
                                        "token": "variable",
                                        "value": "input",
                                        "children": []
                                    }
                                ],
                                "ui": {
                                    "callMode": "generic"
                                }
                            }
                        ]
                    },
                    {
                        "id": "de7315ae-286b-4281-a8ef-f44152bc5fc8",
                        "token": "for",
                        "value": null,
                        "children": [
                            {
                                "id": "4be991a7-b343-40f1-9897-f3e081200426",
                                "token": "assign",
                                "value": null,
                                "children": [
                                    {
                                        "id": "38743cc4-3f0f-4425-ae01-caab2b625dcd",
                                        "token": "variable",
                                        "value": "i",
                                        "children": []
                                    },
                                    {
                                        "id": "4cddbac0-cb71-4bb6-a5e7-e511b628a861",
                                        "token": "number",
                                        "value": 0,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "id": "8d67264a-c4ee-4ba8-9e61-434655dc8aff",
                                "token": "call",
                                "value": null,
                                "children": [
                                    {
                                        "id": "73adf6b8-d88f-422c-89ec-ce02960d0dee",
                                        "token": "variable",
                                        "value": "<",
                                        "children": []
                                    },
                                    {
                                        "id": "cd36063b-ce18-4651-b1a9-626db8ac0f7e",
                                        "token": "variable",
                                        "value": "i",
                                        "children": []
                                    },
                                    {
                                        "id": "aac95559-c06e-4c86-9fcd-eabb0feb0692",
                                        "token": "call",
                                        "value": null,
                                        "children": [
                                            {
                                                "id": "ea385fa3-0a89-43be-a75d-48de61269bcd",
                                                "token": "variable",
                                                "value": "len",
                                                "children": []
                                            },
                                            {
                                                "id": "dd401834-d14a-411d-9615-be19858ec22f",
                                                "token": "variable",
                                                "value": "res",
                                                "children": []
                                            }
                                        ],
                                        "ui": {
                                            "callMode": "fixed",
                                            "callOperation": "len"
                                        }
                                    }
                                ],
                                "ui": {
                                    "callMode": "fixed",
                                    "callOperation": "<"
                                }
                            },
                            {
                                "id": "79c299ef-1801-4746-a2f9-b681396c526c",
                                "token": "assign",
                                "value": null,
                                "children": [
                                    {
                                        "id": "284de3ee-cdb1-432d-9cd5-6f2b5076bc01",
                                        "token": "variable",
                                        "value": "i",
                                        "children": []
                                    },
                                    {
                                        "id": "57fd9097-6107-48a6-bc14-e239a716ebec",
                                        "token": "call",
                                        "value": null,
                                        "children": [
                                            {
                                                "id": "11fd1c17-051c-4233-be00-eeb66d478eae",
                                                "token": "variable",
                                                "value": "+",
                                                "children": []
                                            },
                                            {
                                                "id": "7264f40e-c148-45ec-88c4-397fb2a39a29",
                                                "token": "variable",
                                                "value": "i",
                                                "children": []
                                            },
                                            {
                                                "id": "7cf3637f-a71c-4f43-b7ce-8f7b35c0b7d0",
                                                "token": "number",
                                                "value": 1,
                                                "children": []
                                            }
                                        ],
                                        "ui": {
                                            "callMode": "fixed",
                                            "callOperation": "+"
                                        }
                                    }
                                ]
                            },
                            {
                                "id": "6d8a4ff7-6387-4dd0-8582-3df31ae0ba04",
                                "token": "call",
                                "value": null,
                                "children": [
                                    {
                                        "id": "adb4d61b-40bc-4511-adb9-52bdc6d7322d",
                                        "token": "variable",
                                        "value": "print",
                                        "children": []
                                    },
                                    {
                                        "id": "e01e8539-8364-4678-8784-d5befcd5756d",
                                        "token": "call",
                                        "value": null,
                                        "children": [
                                            {
                                                "id": "575997ca-3a79-4179-9d6c-b8f4eab8913a",
                                                "token": "variable",
                                                "value": "fromCharCode",
                                                "children": []
                                            },
                                            {
                                                "id": "1afab448-de83-44e1-9376-267875455a34",
                                                "token": "call",
                                                "value": null,
                                                "children": [
                                                    {
                                                        "id": "b171c16b-d42a-4e12-a843-9484a18d786e",
                                                        "token": "variable",
                                                        "value": "at",
                                                        "children": []
                                                    },
                                                    {
                                                        "id": "35f8d00a-c5e4-4c6a-96bd-b34c9db189b8",
                                                        "token": "variable",
                                                        "value": "res",
                                                        "children": []
                                                    },
                                                    {
                                                        "id": "93287a63-f1e6-4366-bfd5-253c02f08495",
                                                        "token": "variable",
                                                        "value": "i",
                                                        "children": []
                                                    }
                                                ],
                                                "ui": {
                                                    "callMode": "fixed",
                                                    "callOperation": "at"
                                                }
                                            }
                                        ],
                                        "ui": {
                                            "callMode": "fixed",
                                            "callOperation": "fromCharCode"
                                        }
                                    }
                                ],
                                "ui": {
                                    "callMode": "fixed",
                                    "callOperation": "print"
                                }
                            }
                        ]
                    }
                ]
            }
        }
    ]
};
