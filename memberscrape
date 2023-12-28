import discum

bot = discum.Client(token='user token here not bot token')

@bot.gateway.command
def memberTest(resp):
    guild_id = 'server id here'
    channel_id = 'channel id here'
    if resp.event.ready_supplemental:
        bot.gateway.fetchMembers(guild_id, channel_id)  # put wait=1 in params if you'd like to wait 1 second in between requests
    if bot.gateway.finishedMemberFetching(guild_id):
        lenmembersfetched = len(bot.gateway.session.guild(guild_id).members)
        print(str(lenmembersfetched) + ' members fetched')
        
        character_limit = 1900
        current_characters = 0
        file_counter = 1
        
        with open(f'members_{file_counter}.txt', 'w') as file:
            for line in bot.gateway.session.guild(guild_id).members:
                if line.startswith('<SYNC> updated member'):
                    # Extract member ID from the line
                    member_id = line.split()[-1]
                    formatted_member = f'<@{member_id}>'
                else:
                    formatted_member = f'<@{line}>'
                
                if current_characters + len(formatted_member) + 1 > character_limit:
                    # If adding the current formatted member exceeds the limit, close the current file and create a new one
                    file_counter += 1
                    file.close()
                    file = open(f'members_{file_counter}.txt', 'w')
                    current_characters = 0
                
                file.write(formatted_member + '\n')
                current_characters += len(formatted_member) + 1  # Add 1 for the newline character
        
        bot.gateway.removeCommand(memberTest)
        bot.gateway.close()

bot.gateway.run()
