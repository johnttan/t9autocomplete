function T9(wordList, maxSearch, numWords){
  this.maxSearch = maxSearch;
  this.numWords = numWords;

  this.wordsArray = Object.keys(wordList);

  this.trie = {};

  this.mapKeyToNum = {
    'a': 2,
    'b': 2,
    'c': 2,
    'd': 3,
    'e': 3,
    'f': 3,
    'g': 4,
    'h': 4,
    'i': 4,
    'j': 5,
    'k': 5,
    'l': 5,
    'm': 6,
    'n': 6,
    'o': 6,
    'p': 7,
    'r': 7,
    'q': 7,
    's': 7,
    't': 8,
    'u': 8,
    'v': 8,
    'w': 9,
    'x': 9,
    'y': 9,
    'z': 9
  };


  var that = this;
  console.log('loading array of', this.wordsArray.length, 'words')
// Build trie
  _.each(this.wordsArray, function(el){
    var current;
    var built = _.reduce(el.split(''), function(current, char){
      if(that.mapKeyToNum[char.toLowerCase()]){
        if(current[that.mapKeyToNum[char.toLowerCase()]]){
          current = current[that.mapKeyToNum[char.toLowerCase()]];
        }else{
          current[that.mapKeyToNum[char.toLowerCase()]] = {};
          current = current[that.mapKeyToNum[char.toLowerCase()]];
        }
      }

      return current
    }, that.trie)
// Add to words list at this endnode.
    if(!built.words){
      built.words = [el];
    }else{
      built.words.push(el);
    }
  })

  console.log(this.trie);
};

T9.prototype.txt = function(num, node){
  if(!node){
    node = this.trie;
  }
  if(node[num]){
    node = node[num];
  }
  var that = this;
  console.log(node.words, 'txt')
  return {
    txt:function(num){
      return that.txt(num, node);
    },
    result:function(){
      return that._bfs(node);
    } 
  }
};

// Does BFS to find certain num of words. Returns found words.
T9.prototype._bfs = function(node){
  var wordsList = [];
  var queue = [];
  queue.push(node);
  console.log(node.words, 'inbfs');
  var maxSearch = this.maxSearch;

  // Will return if it has explored maxSearch nodes or found numWords of words.
  while(wordsList.length < this.numWords && queue.length > 0 && maxSearch > 0){
    var current = queue.shift();
    _.each(current, function(el, key){
      queue.push(el);
    })
    if(current.words){
      wordsList = wordsList.concat(current.words);
    }
    maxSearch -= 1;
  }
  return wordsList;
};