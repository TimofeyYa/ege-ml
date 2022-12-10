'use strict'

window.addEventListener('DOMContentLoaded', ()=>{
    console.log("It works");

    const options = {
        task: 'classification',
        debug: true
    }

    // Принимает результаты экзаменов ЕГЭ за 4 предмета
    // Русский, математика, обществознание и информатика
    // Вычесляет, поступит ли абитурьент в вуз на бюджет с такими баллами

    const data = [
        [[35, 90, 90, 90], ['Нет']],
        [[100, 10, 100, 100], ['Нет']],
        [[50, 50, 90, 50], ['Нет']],
        [[70, 70, 50, 30], ['Нет']],
        [[70, 60, 90, 10], ['Нет']],
        [[85, 90, 55, 15], ['Нет']],
        [[100, 5, 100, 100], ['Нет']],
        [[10, 100, 100, 100], ['Нет']],
        [[100, 24, 100, 100], ['Нет']],
        [[24, 100, 100, 100], ['Нет']],

        [[90, 90, 90, 90], ['Да']],
        [[50, 90, 50, 90], ['Да']],
        [[80, 90, 90, 10], ['Да']],
        [[50, 60, 100, 90], ['Да']],
        [[35, 100, 100, 100], ['Да']],
        [[100, 55, 5, 60], ['Да']],
        [[35, 100, 100, 100], ['Да']],
        [[100, 100, 5, 100], ['Да']],
        [[100, 100, 100, 5], ['Да']],
        [[100, 25, 100, 100], ['Да']],
        [[25, 100, 100, 100], ['Да']],
    ] 

    const nn = ml5.neuralNetwork(options)

    data.forEach(elem=>{
        nn.addData(elem[0], elem[1])
    })

    // Step 5: normalize your data;
    nn.normalizeData();

    // Step 6: train your neural network
    const trainingOptions = {
        epochs: 350,
        batchSize: 10
    }
    nn.train(trainingOptions, finishedTraining);

    // Step 7: use the trained model

    function finishedTraining(){
        nn.classify([100, 100, 20, 5], console.log);
    }

    const btn = document.querySelector('.box button');
    const inp = document.querySelector('.box input')
    btn.addEventListener('click', ()=>{
        const data = inp.value.split(' ');
        if (data.length == 4){
            nn.classify(data.map(item =>Number(item)))
              .then(alertData)
        }
    })

    async function alertData(info){
        alert(`${info[0]['label']} с вероятностью ${Math.round(info[0]['confidence'] * 1000) / 10}%`)
    }
})