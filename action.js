var input_field = document.getElementById("field");
var input_id = document.getElementById("accountID");
var input_username = document.getElementById("username");
var messagePlace = 'chat';
var codeID = 0

// var costume = prompt("costume id:")
var costume = 0

// easy to create element on js
function EZcreate(what,where,contents,attach,how) {
  var _a = document.createElement(what);
  var _b = document.getElementById(where);
  _a.innerText = contents;
  for (let i = 0; i < attach.length; i++) {
    _a.setAttribute(attach[i][0],attach[i][1]);
  }
  if(how == true) {
    _b.appendChild(_a);
  } else {
    _b.prepend(_a);
  }
}

function extractHashtags(text) {
  const regex = /#\S+/g; // #から始まり、スペース以外の文字が続く部分を検索
  const hashtags = text.match(regex); // マッチする部分を配列として取得
  return hashtags ? hashtags : []; // ハッシュタグが見つからなければ空の配列を返す
}

// // 使用例
// const text = "今日は#晴れ とてもいい天気！ #散歩行きたいな";
// const hashtags = extractHashtags(text);
// console.log(hashtags); // 出力: [ '#晴れ', '#散歩行きたいな' ]

function separateHashtags(text) {
  const regex = /#\S+/g; // ハッシュタグを識別する正規表現
  let result = [];
  let lastIndex = 0;

  // ハッシュタグを順に処理
  text.replace(regex, (match, offset) => {
    // ハッシュタグの前の部分を追加
    if (offset > lastIndex) {
      result.push(text.slice(lastIndex, offset));
    }
    // ハッシュタグを追加
    result.push(match);
    lastIndex = offset + match.length;
  });

  // 最後の部分（ハッシュタグ後）を追加
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result.filter(item => item !== ''); // 空の要素を取り除く
}

// // 使用例
// const text = "今日は#晴れ とてもいい天気！ #散歩行きたいな";
// const separatedText = separateHashtags(text);
// console.log(separatedText); 
// // 出力: [ '今日は', '#晴れ', ' とてもいい天気！', '#散歩行きたいな' ]



function send() {
  if(input_field.value.length > 0) {
    comment(input_username.value,input_id.value,input_field.value);
    input_field.value = '';
  }
}

function comment(name,ID,message) {
  codeID++;

  // ID [0000] : [ Rank , ]

  
  
  
  EZcreate("li",messagePlace,"",[["id",codeID]],true)
  EZcreate("div",codeID,"",[["id",codeID+"-messageBody"],["class","messageBody"]],true)
  EZcreate("div",codeID+"-messageBody","",[["id",codeID+"-Avatar"]],true)
  EZcreate("div",codeID+"-Avatar","",[["id",codeID+"-Avatar-Back"],["class","AvatarBack"],["class","Costume-"+costume]],true)
  EZcreate("img",codeID+"-Avatar-Back","",[["id",codeID+"-Avatar-Img"],["src","avatar.png"],["class","AvatarMain"]],true)
  EZcreate("div",codeID+"-messageBody","",[["id",codeID+"-Texts"],["class","TextsMain"]],true)
  EZcreate("div",codeID+"-Texts",name,[["id",codeID+"-Username"],["class","Texts-Username"]],true)
  EZcreate("div",codeID+"-Texts","",[["id",codeID+"-Message"],["class","Texts-Message"]],true)

  var hashtags01 = separateHashtags(message);
  var hashtags02 = extractHashtags(message);

  for (let i = 0; i < hashtags01.length; i++) {
    if (hashtags02.some(hashtags02 => hashtags01[i].includes(hashtags02))) {
      EZcreate("a",codeID+"-Message",hashtags01[i],[["id","hashT"+i],["src",hashtags01[i]]],true);
    } else {
      EZcreate("span",codeID+"-Message",hashtags01[i],"",true);
    }
  }
}