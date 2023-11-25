const PublisherModel = require("../../../models/PublisherModel");
const { responseReturn } = require("../../../utils/response");

// for add publisher
exports.addPublisher = async (req, res) => {
    const { name, image } = req.body;
    const slug = name.trim().split(' ').join('-').toLowerCase();

    try {
        const publisher = await PublisherModel.findOne({ name })
        // console.log(publisher);
        if (!publisher) {
            await PublisherModel.create({
                name: name.trim(),
                image: image.trim(),
                slug
            });
            responseReturn(res, 200, { message: 'Publisher added successful' })
        } else {
            // TODO: it cant sent to client side
            responseReturn(res, 500, { error: 'publisher already exist' })
        }
    } catch (error) {
        responseReturn(res, 500, { error: error.message })
    }
}