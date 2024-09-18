import mongoose from "mongoose";

const { Schema } = mongoose;

export const allowedActions = ["Post", "Update", "Read", "Delete"];

const actionSchema = new Schema({
  action: {
    type: String,
    required: true,
    lowercase:true,
    validate: {
      validator: function (value) {
        return allowedActions.includes(value);
      },
      message: (props) => `${props.value} is not a valid action`,
    },
  },
});

const permissionSchema = new Schema({
  module: {
    type: String,
    unique: true,
    required: true,
  },
  methods: [actionSchema],
});

export const Permission = mongoose.model("Permission", permissionSchema);


/*

{
        "module": "Invoice",
        "methods": [
            {
                "action": "Post"
            },
            {
                "action": "Update"
            },
            {
                "action": "Read"
            },
            {
                "action": "Delete"
            }
        ]
    },

*/