function App(){
  this.T9 = new T9(allWords, 500000, 200);
};

App.prototype.init = function(){
  var that = this;
  $('#keypad').on('keyup', function(e){
    var current;
    var val = $('#keypad').val();
    if(val.length > 0){
      _.each(val.split(''), function(el){
        if(!current){
          current = that.T9.txt(parseInt(el))
        }else{
          current = current.txt(parseInt(el))
        }
      })
      that.render(current.result())
    }else{
      that.render([])
    }
  })
}

App.prototype.render = function(listOfWords){
  var result = "";
  listOfWords.sort(function(a, b){
    return a.length - b.length;
  })
  listOfWords.forEach(function(el){
    var temp = "<div>" + el.toString() + "</div>";
    result += temp;
  })
  $('#suggestions').html(result);
}