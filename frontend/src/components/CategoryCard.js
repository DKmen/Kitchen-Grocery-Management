import { Grid, Typography } from "@material-ui/core";

export default function CustimizeCategoryCard(props) {
  return (
    <Grid xs={12} sm={6} md={4} xl={2} style={{ padding: 20 }}>
      <div
        style={{
          width: "100%",
          borderRadius: "4px",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor:'grab'
        }}
        onClick={props.onClick}
      >
        <Typography variant="h4" align="center">{props.title}</Typography>
      </div>
    </Grid>
  );
}
