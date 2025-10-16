const { Strategy: JwtStrategy, ExtractJwt } = require( "passport-jwt");
const passport = require( "passport");
const  prisma = require( "./prisma.js");
const dotenv = require( "dotenv");


dotenv.config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: jwt_payload.id },
        });

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        console.error("Error in JWT strategy:", error);
        return done(error, false);
    }
}));

module.exports = passport;