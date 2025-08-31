const user = require('../../models/user')

exports.showuserprofile = async (req, res) => {
    try {
        const userid = req.params.id
        const userdetail = await user.findById(userid)

        res.render('userprofile', { user: userdetail, err: null, msg: null})
    } catch (err) {
        console.error(err)
        res.redirect('/')
    }
}

exports.updateuser = async (req, res) => {
    try {
        const userid = req.params.id
        const { name, user_id, email, number, dob, license } = req.body

        await user.findByIdAndUpdate(userid, { name, user_id, email, number, dob, license })

        const userdetail = await user.findById(userid)

       return res.render('userprofile',{user:userdetail,err:null,msg:'Profile Updated Successfully'})
        // return res.redirect(`/userprofile/${userid}`)

    } catch (err) {
        console.error(err)
        return res.render('userprofile/${userid}',{user:userdetail,err:'Profile not Updated',msg:null})
    }
}
