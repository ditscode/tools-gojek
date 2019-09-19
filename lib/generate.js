const genUniqueId = length => {
    var text = "";
    var possible =
        "abcdefghijklmnopqrstuvwxyz1234567890";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

module.exports = {
    genUniqueId
}
