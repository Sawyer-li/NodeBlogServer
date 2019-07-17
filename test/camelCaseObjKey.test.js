const { camelCaseObjKey } = require("../tool");
const testData = {
    test_id: 1,
    test_name: "sawyer",
    test_tel: 13994705977
}


console.log(camelCaseObjKey(testData));