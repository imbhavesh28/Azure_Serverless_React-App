module.exports = async function (context, req, inputDocument) {
    context.log('GetAllData function called.');
    context.res = {
            // status: 200, /* Defaults to 200 */
            body: inputDocument
    }
};