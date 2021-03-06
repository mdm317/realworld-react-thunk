/* eslint-disable */ //eslint 적용안함
console.log(process.env.NODE_ENV);
module.exports={
    presets:[
        ["@babel/preset-env",{
            targets:{
                ie:"11"
            },
            useBuiltIns:"usage",    
                //폴리필 es5로 변환불가능한 즉 promise 같은거에 import 를 추가해줌
                //아래에 그 임포트를 corejs 로 설정함
            corejs:{
                version:3
            }
        }],
        "@babel/preset-react",
        "@babel/preset-typescript"
    ],
    plugins:  process.env.NODE_ENV === "production"?["transform-remove-console"]:[]
    
}