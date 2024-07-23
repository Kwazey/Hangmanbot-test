Discord = require('discord.js');
const { Console } = require('console');
const {Client, MessageAttachment} = require('discord.js');
const Bot = new Client();
const token = 'NzIxNDMzNjYzNTMwODYwNjA1.XuUdoQ.4CDMQWndRy526YtMBi01a8L-OIA';
const fs = require('fs');


// -----------------Not being used--------------------------------//
Word_list = ['exploit', 'word', 'biology', 'road', 'flight', 'tell', 'fantasy', 'charm', 'am', 'overcharge',
    'promote', 'notebook', 'soil', 'fibre', 'migration', 'sour', 'rotation', 'roll', 'manual', 'run', 'auction',
    'reporter', 'toss', 'solution', 'privilege', 'ditch', 'institution', 'correspond', 'distance',
    'huge', 'explain', 'chemistry', 'pension', 'battery', 'turkey', 'invasion', 'demonstrator', 'lighter',
    'adoption', 'valley', 'liability', 'stop', 'departure', 'linen', 'giant', 'morsel', 'liberty', 'basic',
    'temptation', 'push', 'stress', 'cucumber', 'cereal', 'chord', 'deprive', 'amuse', 'halt', 'progressive',
    'reproduction', 'tribute', 'shame', 'evaluate', 'amber', 'objective', 'mist', 'continuous', 'museum',
    'analyst', 'portrait', 'post', 'week', 'telephone', 'salon', 'fence', 'exhibition', 'staff', 'risk',
    'document', 'guide', 'coup', 'damage', 'flawed', 'abnormal', 'misery', 'way', 'compartment',
    'agreement', 'foundation', 'character', 'fling', 'lend', 'list', 'mug', 'encourage', 'paint', 'predict',
    'south', 'quote', 'glance', 'designer', 'contrary', 'ambiguous', 'profound', 'theorist', 'activity'
    , 'register', 'convince', 'deprivation', 'sacrifice', 'vertical']
//------------------------------------------------------------------------//

var svits = 0   // Switch
var Img;        // Current picture
var Strong;     // Input string (args 1)
var Word;       // Word that is in game  
var Word_o;     // Word that the users are seeing
var alr_g = []; // Already guessed letters
var Stage = 0;  // Current game stage   
var Temp;       // temp
var tmp         // tmp
var tmpp        // tmpp
var reply;      // What the discord bot replies with
var leg;        // Comparison bool thingy
var res;        // res
var pos;        // Position used when.. position
var Dif = 0;    // Difficulty
var Tries;      // Amount of guesses
var Word_list_big; // Bigger world list from file
var C_Channel;





const PREFIX = '!';

function yes(str) {
    //console.log('String in array is: ', str, 'Letter compared to is: ', Word_o[pos]);
    if (str == Word_o[pos]) {
        res++;
    }
    else {
        res = 0;
    }
    pos++;
}

function isLetter(str) {
    //console.log("isfletter")
    return str.length === 1 && str.match(/[a-ö]/i);
}

function ifLetter(str) {
    //console.log("ifletter")
    if (!(str.length === 1 && str.match(/[a-ö]/i))) {
        leg = 1;
        console.log('not very letter of you..')
    }
}

function compare(str) {
   // console.log('String in array is: ', str, 'Letter compared to is: ', Temp);
    if (str == Temp) {
        leg = 1;
    }
}

function already_guessed(str) {
    //console.log('Already guess letters:', alr_g);
    leg = 0;
    alr_g.forEach(compare)
    if (leg == 1) {
        return 1;
    }
    else {
        return 0;
    }
}

function Control(Ltr) {
    if (isLetter(Ltr)) {
        if (!already_guessed(Ltr)) {
            //reply = 'The guess was legit', Ltr;
            console.log('Guess was a letter and not previously guessed');
            alr_g.push(Ltr);
            //console.log('push something');
            return 1;
           
        }
        else {
            reply = 'You can not guess a letter you have guessed before!';
            console.log('Guess was previously guessed');
            return 0;
        }
    }
    else {
        reply = 'You have to guess a letter';
        console.log('Guess was a not a letter');
        return 0;
    }
    console.log('kommer jag hit?');
}

function Hangman(user) {

    switch (Stage) {

        case 0:
            console.log('A game has started');
            Stage = 1;
            console.log('Stage is: ', Stage);
            break;
        case 1:
            console.log('Stage is: ', Stage);
            console.log('Game is still in progress');
            break;
        case 2:
            console.log('Game Over, Tries ran out');
            reply = 'Lemao u lost n00b the word was :';
            break;
        case 3:
            console.log('Game Over, The entire word was guessed');
            reply = 'Game Over, The entire word was guessed';
            break;
    }
}

function Correctletter(str) {
    //console.log('String in array is: ', str, 'Letter compared to is: ', Temp);
    if (str == Temp) {
        Word_o[pos] = Temp; 
        leg = 1;
        console.log('very yes very correct');
    }
    pos++

}

function check_if_correct(str) {
    pos = 0;
    leg = 0;
    Word.forEach(Correctletter)
    if (leg == 1) {
        return 1;
    }
    else {
        return 0;
    }
}

function dash_fill() {
    Word_o[pos] = '.'; 
    pos++;
}

function check_done(guessed) {
    tmp = Word_o;
    Word_o = guessed;
    console.log('Word is:', Word);
    //console.log('guessed', guessed);
    pos = 0
    res = 0
    Word.forEach(yes)
    Word_o = tmp
    console.log('Function returned value: ', res);
    console.log('guessed is: ', guessed);
    if (res == guessed.length) {
        Stage = 3;
    }
}

function Err_check(i) {
    if (i) {
        if (Stage == 0 || Stage == 1) {
            var ar = [];
            ar = i.split("");
            pos = 0;
            leg = 0;
            ar.forEach(ifLetter);
            if (leg == 1 && Stage == 0) {
                Stage = 5;
            }
            else if (leg == 1 && Stage == 1)
            {
                console.log('User guessed something other than a letter')
                reply = 'You can only guess letters!';
                return 1;
            }
            else {
                //console.log('all is good');
            }
        }
    }

    else {                                  //Reach this state is 'i' is undefined
        //console.log('variable i in Err_check is: ' +  i);
        reply = 'You have to guess something u fool';
        console.log('User guessed undefined string');
        Stage = 5;
    } 
}

function Num_Tries() {
    Tries--;
    console.log(Tries, 'Tries left');
    Img = './Pics/'+Tries+'.png'
    //console.log(Img);

    if (Tries == 0) {
        Stage = 2;
    }

}

function Randomize(String) {
    //val = Math.floor((Math.random() * 109) + 1); // If using Word_list
    val = Math.floor((Math.random() * 58108) + 1); // if using Word_list_big
    console.log(val);
    String = Word_list_big[val]; // can use Word_list_big or Word_list
    console.log('random word is', String);
    return String;
    
}

function Difficulty() {
    if (Dif == 0) {
        return 11;
    }
    if (Dif == 1) {
        return 7;
    }
    if (Dif == 2) {
        return 3;
    }
    if (Dif == 3) {
        return 1;
    }
    if(Dif ==4 ) {
        return 2;
    }

}

function Stat_update(User, Type) {
    if (Type == 0) {
        const path = './Stats/' + (User) + '-corr.txt'

        if (fs.existsSync(path)) {
            fs.readFile('./Stats/' + (User) + '-corr.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error(err)
                    data = 0
                    return
                }
                //console.log(data)
                tmp = data
                tmp++
            })

            setTimeout(() => {
                fs.writeFile('./Stats/' + (User) + '-corr.txt', tmp.toString(), function (err) {
                    if (err) throw err;
                    console.log('Updated "corr" file with data: ' + tmp);
                });
            }, 100)
        }
        else {

            fs.writeFile('./Stats/' + (User) + '-corr.txt', '1', function (err) {
                if (err) throw err;
                console.log('Created "corr" file');
            });

        }
    }
    else {
        const path = './Stats/' + (User) + '-tot.txt'

        if (fs.existsSync(path)) {
            fs.readFile('./Stats/' + (User) + '-tot.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error(err)
                    data = 0
                    return
                }
                tmpp = data
                tmpp++
            })


            setTimeout(() => {
                fs.writeFile('./Stats/' + (User) + '-tot.txt', tmpp.toString(), function (err) {
                    if (err) throw err;
                    console.log('Updated "tot" file with data: '+ tmpp );
                });
            }, 100)
        }
        else {

            fs.writeFile('./Stats/' + (User) + '-tot.txt', '1', function (err) {
                if (err) throw err;
                console.log('Created "tot" file');
            });

        }
    }

}

function Stats(User) {

    var tot = fs.readFileSync('./Stats/' + (User) + '-tot.txt', 'utf8')
    var cor = fs.readFileSync('./Stats/' + (User) + '-corr.txt', 'utf8')
    return cor / tot;

}

function reset() {
    Stage = 0;
    Strong = '';
    Word = [];
    Word_o = [];
    alr_g = [];
    Temp = '';
    reply = '';
    leg = 0;
    pos = 0;
    Tries = 11;
    svits = 0;
    console.log('Bot was reset!');
}

Bot.once('ready', () => {
    Word_list_big = fs.readFileSync('Wordlist.txt', 'utf8').split("\r\n"); //use .split() to chose a character to define where a new piece of data starts
    Bot.guilds;
    console.log('This bot is online');
    console.log('Stage is: ', Stage);
})

Bot.on('message', msg => {

    let args = msg.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'ping':
            msg.reply('pong!');
            break;

        //case 'send':
        //    const attatchment2 = new MessageAttachment('./rules.txt');
        //    msg.channel.send(msg.author, attatchment2);
        //    break; 


        case 'start':
            if (Stage != 1) {                   // If a game is not already in progress
                Err_check(args[1]);             // Need to control that args is not numbers of foreign signs
                if (Stage != 5) {               // If tings did not go wrong
                    Tries = Difficulty();
                    console.log('TRies is ', Tries);
                    //console.log('we in dis');
                    if(msg.channel.type =='dm' && msg.author.username == aut){
                        C_Channel = chn;
                        svits = 2;
                        chn.send(aut + 'Has started a game of Hangman!')
                    }
                    if (args[1] == "random") {  // If random then get random word
                        args[1] = Randomize(args[1]);
                        svits = 1
                        msg.reply('Has started a game of Hangman with a randomized word!');

                    }
                    Strong = args[1];
                    if (svits == 0) {  
                        msg.delete();         // If manual word
                        //console.log('HEEEJ')
                        C_Channel = msg.channel;
                        msg.reply('Has started a game of Hangman!');
                    }
                    Word = Strong.split("");
                    Word_o = Strong.split("");
                    pos = 0;
                    Word_o.forEach(dash_fill);
                    Hangman((msg.author.username));
                    console.log(Word_o.join(" "));

                    setTimeout(() => { 
                    C_Channel.send("---------------1 Second delay----------------")
                    C_Channel.send(Word_o.join(" "));
                    C_Channel.send('Guess a letter with !guess');
                    }, 1000);
                }
                else {
                    C_Channel.send('The word cannot be empty and has to be letters only!');
                    Stage = 0;
                }
            }
            else {
                C_Channel.send('You cannot start a new game when another game is in progress!');
            }
            break;

        case 'guess':

            if (Stage == 1) {                               // If game has started
                //console.log('Message prefix guess');
                Err_check(args[1]);
                if (Stage != 5) {                           // If tings didnt go wrong starting
                    Temp = args[1];
                    console.log('Temp is:', Temp);
                    if (Temp.length > 1 && (Err_check(Temp) != 1)) {  //If the guess is more than one letter and is a letter
                        Stat_update((msg.author.username), 1)
                        Temp = Temp.split("");
                         check_done(Temp)                      // Check if the word is correct 
                        if (Stage == 3) {
                            Hangman((msg.author.username));
                            Stat_update((msg.author.username), 0)
                            msg.channel.send('good boi u are');
                            msg.channel.send(reply);
                            msg.channel.send(Strong);
                            reset();
                            break;
                        }
                        else {
                            Num_Tries(Img);
                            const attatchment = new MessageAttachment(Img);
                            msg.channel.send(attatchment);
                            msg.channel.send(Word_o.join(" "));
                        }
                    }
                    else if (Control(Temp) == 1 && Temp.length == 1) {               // If temp is a letter that has not been guessed before
                        Stat_update((msg.author.username), 1)
                        //console.log('JUST ONE LETTER')
                        //msg.reply(reply);
                        if (check_if_correct(Temp) == 1) {  // If temp guess was correct
                            Stat_update((msg.author.username), 0)
                            check_done(Word_o);
                            msg.channel.send(Word_o.join(" "));
                        }
                        else {                               // If temp guess was incorrect
                            Num_Tries(Img);
                            const attatchment = new MessageAttachment(Img);
                            msg.channel.send(attatchment);
                            msg.channel.send(Word_o.join(" "));
                        }
                    }
                    else {
                        msg.reply(reply);
                    }
                    Hangman((msg.author.username));
                    if (Stage == 2 || Stage == 3) {
                        msg.channel.send(reply);
                        msg.channel.send(Strong);
                        reset();
                    }
                }
                else {
                    console.log('Wrong tings got us ere');
                    msg.channel.send(reply);
                    Stage = 1;
                }
            }
            else {
                msg.channel.send('You can not guess when there is no active game!');
            }
            break;

        case 'guessed': // Guessed letters
            if (Stage == 1, alr_g.length != 0) {
                msg.channel.send((alr_g.sort()).join(" "));
            }
            else {
                msg.channel.send('Guessed can only be used when a game is active and letters has been guessed!');
            }
            break;

        case 'stop': // Stop game
            if (Stage == 1) {
                reset();
                msg.channel.send('Game was stopped!');
            }
            else {
                reset();
                msg.channel.send('Stop can only be used when a game is active!');
            }
            break;

        case 'stage': // Stage check
            msg.channel.send(Stage);
            break;

        case 'help': // Help
            msg.channel.send('Start a game by writing  !start "word"' + '\r\n'
                + 'Start a game with a random word by writing  !start random' + '\r\n'
                + 'Guess a word by writing  !guess "letter"' + '\r\n'
                + 'See previously guessed letter with  !guessed' + '\r\n'
                + 'Stop a current game by writing  !stop' + '\r\n'
                + 'Change difficulty by writing diff "normal", diff hard or diff "veryhard" ');
            break;

        case 'diff': // Difficulty settings
            if (args[1] == "impossibru") {
                Dif = 3;
                msg.channel.send('Man u gon lose..');
            }
            if (args[1] == "impossible") {
                Dif = 4;
                msg.channel.send('Good luck!');
            }
            if (args[1] == "veryhard") {
                Dif = 2;
                msg.channel.send('Difficulty set to veryhard!');
            }
            if (args[1] == "hard") {
                Dif = 1;
                msg.channel.send('Difficulty set to hard!');
            }
            if (args[1] == "normal") {
                Dif = 0;
                msg.channel.send('Difficulty set to normal!');
            }
            if (args[1] == "+") {
                if (Dif == 3) {
                    msg.channel.send('You cant raise the difficulty any further! ');
                }
                else {
                    Dif = Dif + 1;
                    msg.channel.send('Difficulty raised to ' + Dif + ' out of 3');
                }
            }
            if (args[1] == "-") {
                if (Dif == 0) {
                    msg.channel.send('You cant lower the difficulty more than this! ');
                }
                else {
                    Dif = Dif - 1;
                    msg.channel.send('Difficulty lowered to ' + Dif + ' out of 3');
                }
            }
            if (args[1] == "status") {
                msg.channel.send(Dif);
            }
            break;
                             
        case 'count': // Not important test.
            fs.readFile((msg.author.username) + '.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error(err)
                    data = 0
                    return
                }
                console.log(data)
                tmp = data
                tmp++
            })

            setTimeout(() => {
                fs.writeFile((msg.author.username) + '.txt', tmp.toString(), function (err) {
                    if (err) throw err;
                    console.log('Updated file');
                });
            }, 100)
            break;

        case 'stats':
            if (fs.existsSync('./Stats/' + msg.author.username + '-corr.txt') && (fs.existsSync('./Stats/' + msg.author.username + '-tot.txt'))) {
                msg.reply('has a ' + (Math.round(Stats((msg.author.username)) * 100) / 100)*100 + '% guessing accuracy')
                break;
            }
            else {
                msg.reply('No')
            }

//------------------ NOT REALLY RELATED TO HANGMAN-------------------------------//
        case 'tstart':
           if(args[1] == 'DM'){
        console.log('tstart')
           aut = msg.author.username
           chn = msg.channel
           msg.author.send('write your word')

           }
        
        console.log('we out')
           break;

        case'test':
        console.log('test')
        ass = msg.channel.id
        //console.log(Bot.guilds.fetch(options))
        var spods = (Bot.guilds.cache.get('721434155753406474')).channels.cache.get(ass)
        console.log(spods)
        spods.send('gg')
       // hods = spods.channels.cache.get(msg.channelid)
        //console.log(war1.channel)
        console.log('end')
        break;

        case'testt':
        ass = msg.channel.id
        console.log(ass)
        break;
           

    }

})



Bot.on('message', msg => {
    if (msg.content === "HELLO") {
        msg.reply('HELLO FRIEND!');
    }
})


Bot.login(token);
