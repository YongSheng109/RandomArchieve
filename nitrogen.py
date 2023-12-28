import os
import discord
from discord.ext import commands
import requests
import json
import time
import random
import string

def generate_random_string(length):
  characters = string.ascii_letters + string.digits
  return ''.join(random.choices(characters, k=length))


bot = commands.Bot(command_prefix='!')

allowed_channel_id = (your channel id here wihout "")

url = 'https://api.discord.gx.games/v1/direct-fulfillment'
headers = {
}


@bot.command(name='gen')
async def generate_link(ctx):
  # Check if the command is invoked in the allowed channel
  if ctx.channel.id != allowed_channel_id:
    await ctx.send(f"Please use the command in commands channel.")
    return

  data = {'partnerUserId': generate_random_string(64)}

  session = requests.Session()

  try:
    response = session.post(url, headers=headers, json=data)

    if response.status_code == 200:
      token = response.json()['token']
      link = f"https://discord.com/billing/partner-promotions/1180231712274387115/{token}"
      await ctx.send(f"```Nitro -> {link}```")
    elif response.status_code == 429:
      await ctx.send("```Rate limit exceeded! Please try again later.```")
    elif response.status_code == 504:
      await ctx.send("```Server timed out! Please try again later.```")
    else:
      await ctx.send(f"Request failed with status code {response.status_code}."
                     )
      await ctx.send(f"Error message: {response.text}")

  except Exception as e:
    await ctx.send(f"An error occurred: {str(e)}")

  finally:
    session.close()


@bot.event
async def on_ready():
  print(f'We have logged in as {bot.user.name}')


bot.run("discord bot token here")
