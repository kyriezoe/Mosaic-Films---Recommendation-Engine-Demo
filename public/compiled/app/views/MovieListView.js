// Generated by CoffeeScript 1.6.3
(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.MovieListView = (function(_super) {
    __extends(MovieListView, _super);

    function MovieListView() {
      _ref = MovieListView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MovieListView.prototype.template = '\
      <div class="input-group">\
        <input type="text" class="form-control" placeholder="name">\
      </div>\
      <tbody>\
      <table class="table table-hover">\
      </table>\
      </tbody>\
      <button id="submitButton" type="submit" class="btn btn-primary">See Recommendations</button>\
      ';

    MovieListView.prototype.initialize = function() {
      var _this = this;
      return this.model.fetch({
        success: function(collection, response, options) {
          return _this.render(response);
        }
      });
    };

    MovieListView.prototype.events = {
      "click #submitButton": 'newUser'
    };

    MovieListView.prototype.toggle = function() {
      if (this.$el.is(':visible')) {
        this.$el.hide();
        return this.trigger('collapse');
      } else {
        this.$el.show();
        return this.trigger('expand');
      }
    };

    MovieListView.prototype.newUser = function() {
      var newRatings, user,
        _this = this;
      newRatings = {};
      this.username = this.$('input').val();
      this.$('select').each(function(value, key) {
        return newRatings[key.id] = key.value;
      });
      user = new newUser({
        name: this.username,
        movies: newRatings
      });
      return user.save({}, {
        wait: true,
        error: function(model, response) {},
        success: function(model, response) {
          _this.toggle();
          return _this.userCreated();
        }
      });
    };

    MovieListView.prototype.userCreated = function() {
      return this.trigger('userCreated', this.username);
    };

    MovieListView.prototype.render = function(res) {
      var index, movie, _results;
      this.$el.append(this.template);
      _results = [];
      for (index in res) {
        movie = res[index];
        _results.push(this.$('.table').append('<tr><td>\
        ' + movie + '</td>\
        <td>\
        <select class="form-control input-small" id="' + index + '">\
          <option></option>\
          <option>1</option>\
          <option>2</option>\
          <option>3</option>\
          <option>4</option>\
          <option>5</option>\
        </select>\
        </td>\
        </tr>'));
      }
      return _results;
    };

    return MovieListView;

  })(Backbone.View);

}).call(this);

/*
//@ sourceMappingURL=MovieListView.map
*/
