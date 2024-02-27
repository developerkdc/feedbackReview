import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import List from "@mui/material/List";
import { ListItem, ListItemText, Typography } from "@mui/material";

const ViewUser = ({ openView, setOpenView, data }) => {
  return (
    <Dialog
      open={openView}
      onClose={() => setOpenView(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
    >
      <DialogTitle style={{ backgroundColor: "#7352C7", color: "white" }} id="alert-dialog-title">
        Mall Details
      </DialogTitle>
      <DialogContent
        headerSx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
        sx={{ mb: 3.75 }}
      >
        <List
          disablePadding
          sx={{
            display: "flex",
            flexWrap: "wrap",
            margin: (theme) => theme.spacing(0, -2),
          }}
        >
          <ListItem
            sx={{
              width: { xs: "100%", sm: "50%", xl: "33.33%" },
              textAlign: "center",
            }}
          >
            <ListItemText
              primary={
                <Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={0.5}>
                  Mall Name{" "}
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="text.primary">
                  {data?.mall_name || "--"}
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            sx={{
              width: { xs: "100%", sm: "50%", xl: "33.33%" },
              textAlign: "center",
            }}
          >
            <ListItemText
              primary={
                <Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={0.5}>
                  First Name{" "}
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="text.primary">
                  {data?.first_name || "--"}
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            sx={{
              width: { xs: "100%", sm: "50%", xl: "33.33%" },
              textAlign: "center",
            }}
          >
            <ListItemText
              primary={
                <Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={0.5}>
                  Last Name
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="text.primary">
                  {data?.last_name || "--"}
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            sx={{
              width: { xs: "100%", sm: "50%", xl: "33.33%" },
              textAlign: "center",
            }}
          >
            <ListItemText
              primary={
                <Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={0.5}>
                  Phone No
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="text.primary">
                  {data?.mobile_no || "--"}
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            sx={{
              width: { xs: "100%", sm: "50%", xl: "33.33%" },
              textAlign: "center",
            }}
          >
            <ListItemText
              primary={
                <Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={0.5}>
                  Email ID
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="text.primary">
                  {data?.email_id || "--"}
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            sx={{
              width: { xs: "100%", sm: "50%", xl: "33.33%" },
              textAlign: "center",
            }}
          >
            <ListItemText
              primary={
                <Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={0.5}>
                  Location
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="text.primary">
                  {data?.location || "--"}
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            sx={{
              width: { xs: "100%", sm: "50%", xl: "33.33%" },
              textAlign: "center",
            }}
          >
            <ListItemText
              primary={
                <Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={0.5}>
                  Device Type
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="text.primary">
                  {data?.device_type || "--"}
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            sx={{
              width: { xs: "100%", sm: "50%", xl: "33.33%" },
              textAlign: "center",
            }}
          >
            <ListItemText
              primary={
                <Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={0.5}>
                   Device Model
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="text.primary">
                  {data?.model || "--"}
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            sx={{
              width: { xs: "100%", sm: "50%", xl: "33.33%" },
              textAlign: "center",
            }}
          >
            <ListItemText
              primary={
                <Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={0.5}>
                  Serial Number
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="text.primary">
                  {data?.sr_no || "--"}
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            sx={{
              width: { xs: "100%", sm: "50%", xl: "33.33%" },
              textAlign: "center",
            }}
          >
            <ListItemText
              primary={
                <Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={0.5}>
                  Status
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="text.primary">
                  {" "}
                  {data?.status ? "Active" : "Inactive"}
                </Typography>
              }
            />
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenView(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewUser;
