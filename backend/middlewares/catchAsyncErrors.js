module.exports = func => (req, res, next) =>
    Promise.resolve(func(req, res, next))
        .catch(next)

// Exact same code with more readability
// module.exports = func => {
//     return (req, res, next) => {
//         return Promise.resolve(func(req, res, next))
//             .catch(next);
//     };
// };


// OR   -   both works the same

// module.exports = function wrapAsyncMiddleware(func) {
//     return async (req, res, next) => {
//         try {
//             await func(req, res, next);
//         } catch (error) {
//             next(error);
//         }
//     };
// };
