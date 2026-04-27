import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";

// Initial State
const initialState = {
  jobs: [],
  stats: null,
  recentJobs: [],
  loading: false,
  error: null,
};

// Fetch all jobs
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, thunk) => {
    try {
      const { data } = await axiosInstance.get("jobs/all");
      if (data.status === "failed") {
        return thunk.rejectWithValue(data.message);
      }
      return data.response || [];
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunk.rejectWithValue(message);
    }
  }
);

// Fetch job stats
export const fetchJobStats = createAsyncThunk(
  "jobs/fetchJobStats",
  async (_, thunk) => {
    try {
      const { data } = await axiosInstance.get("jobs/stats");
      if (data.status === "failed") {
        return thunk.rejectWithValue(data.message);
      }
      return data.response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunk.rejectWithValue(message);
    }
  }
);

// Fetch recent jobs
export const fetchRecentJobs = createAsyncThunk(
  "jobs/fetchRecentJobs",
  async (_, thunk) => {
    try {
      const { data } = await axiosInstance.get("jobs/recent");
      if (data.status === "failed") {
        return thunk.rejectWithValue(data.message);
      }
      return data.response || [];
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunk.rejectWithValue(message);
    }
  }
);

// Add job
export const addJob = createAsyncThunk(
  "jobs/addJob",
  async (jobData, thunk) => {
    try {
      const { data } = await axiosInstance.post("jobs/addJob", jobData);
      if (data.status === "failed") {
        return thunk.rejectWithValue(data.message);
      }
      return data.response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunk.rejectWithValue(message);
    }
  }
);

// Update job
export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ jobId, jobData }, thunk) => {
    try {
      const { data } = await axiosInstance.put(`jobs/updateJob/${jobId}`, jobData);
      if (data.status === "failed") {
        return thunk.rejectWithValue(data.message);
      }
      return data.response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunk.rejectWithValue(message);
    }
  }
);

// Parse job with AI
export const parseJobData = createAsyncThunk(
  "jobs/parseJobData",
  async (data, thunk) => {
    try {
      const { data: responseData } = await axiosInstance.post("parse-data", data);
      if (responseData.status === "failed") {
        return thunk.rejectWithValue(responseData.message);
      }
      return responseData.response;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunk.rejectWithValue(message);
    }
  }
);

// Delete job
export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (jobId, thunk) => {
    try {
      const { data } = await axiosInstance.delete(`jobs/${jobId}`);
      if (data.status === "failed") {
        return thunk.rejectWithValue(data.message);
      }
      return jobId;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunk.rejectWithValue(message);
    }
  }
);

// Job Slice
const jobSlice = createSlice({
  name: "jobs",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch Jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        state.error = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Stats
      .addCase(fetchJobStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchJobStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Recent
      .addCase(fetchRecentJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.recentJobs = action.payload;
      })
      .addCase(fetchRecentJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Job
      .addCase(addJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.unshift(action.payload);
        state.error = null;
      })
      .addCase(addJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Job
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.jobs.findIndex((j) => j._id === action.payload._id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Parse Job
      .addCase(parseJobData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(parseJobData.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.unshift(action.payload);
        state.error = null;
      })
      .addCase(parseJobData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Job
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = state.jobs.filter((j) => j._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const jobReducer = jobSlice.reducer;
export const jobSelector = (state) => state.jobReducer;
